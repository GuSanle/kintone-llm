interface Window {
  _AMapSecurityConfig: {
    securityJsCode: string
  }
}

type ApiResponse<T> = { success: true; data: T } | { success: false; data: string }
