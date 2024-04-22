import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class AppInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isSvgRequest = req.url.endsWith('.svg');
        const baseUrl = 'https://tepihpomeri.rs/api/wp-json';
        const username: string = 'ck_ad2b12ff817b7805a9e93a8de8eb1be6c83d48f6';
        const password: string = 'cs_7ecb16b5f95ed3cf79f234c2e1c3e379c399982b';
        const woocommerceAutherization  = 'Basic ' + btoa(username + ':' + password);

        const urlWithPrefix = isSvgRequest ? req.url : baseUrl + req.url;
        
        const authReq = req.clone({
          url: urlWithPrefix,

          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': woocommerceAutherization
          })
        });
    
        return next.handle(authReq);
      }
       
    }