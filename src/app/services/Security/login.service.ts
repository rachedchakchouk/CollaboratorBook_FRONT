import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  private urlToken="http://localhost:8087/api/login";

  constructor( private router: Router, private http: HttpClient) {
  }
  async canActivate() {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");
    const username=localStorage.getItem("username")


    if (accesstoken && !this.jwtHelper.isTokenExpired(accesstoken)) {
      return true;
    }

    const isRefreshSuccess = await this.refreshingTokens(refreshtoken);
    if (!isRefreshSuccess) {
      this.router.navigate(["/Login"]);
    }

    return isRefreshSuccess;
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {

      const response = await lastValueFrom(this.http.get("http://localhost:8087/api/token/refresh/",));
      const newToken = (<any>response).accessToken;
      const newRefreshToken = (<any>response).refreshToken;

      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      //this.notification.showSuccess("Token renewed successfully", "Success")
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
