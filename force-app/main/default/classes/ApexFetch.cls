  global with sharing class ApexFetch {
    
    @RemoteAction
    global static String ff(String url) {

        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        String s = res.getBody();
         System.debug(s);

        return s;
    }
}
