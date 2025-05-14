import { Client_URL_Absolute } from "./uriEnums/Client_Url.ts";


export function resetPassTemplate(token: string) {
  return (
    `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Password Reset</title>
        </head>
        <body style="width:100%; margin:0; padding:0; background-color:#f8f8f8;">
          <div style="display:flex; justify-content:center; align-items:center; height:100vh; width:100%;">
            <div style="width:100%; padding:20px; background:#ffffff; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1); text-align:center; font-family:sans-serif;">
              <p style="margin:0 0 10px 0;">You requested a password reset!</p>
              <p style="margin:0;">Click this <a href="${Client_URL_Absolute.resetPassword}/${token}" style="color:#007BFF; text-decoration:none;">link</a> to set a new password</p>
            </div>
          </div>
        </body>
        </html>`
  )
}