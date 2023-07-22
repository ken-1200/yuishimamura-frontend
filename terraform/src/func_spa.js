function handler(event) {
  var request = event.request;
  var clientIP = event.viewer.ip;
  var headers = request.headers;
  var uri = request.uri;

  if (uri.endsWith('/upload_images') || uri.endsWith('/edit_images')) {
    // アクセス許可するIPを設定
    var IP_WHITE_LIST = ['126.51.205.12'];
    // クライアントIPが、アクセス許可するIPに含まれていればtrueを返す
    var isPermittedIp = IP_WHITE_LIST.includes(clientIP);

    // 許可していないIPの場合
    if (isPermittedIp === false) {
      // falseの場合はViewerに対してレスポンスを返す
      return {
        statusCode: 403,
        statusDescription: 'Forbidden',
      };
    }

    // echo -n user:pass | base64
    var authString = 'Basic eXVpc2hpbWFtdXJhOkEza04wV01melRXRzJrdlM=';

    if (typeof headers.authorization === 'undefined' || headers.authorization.value !== authString) {
      return {
        statusCode: 401,
        statusDescription: 'Unauthorized',
        headers: { 'www-authenticate': { value: 'Basic' } },
      };
    }
  }

  return request;
}

