  global with sharing class ApexFetch {
    
    @RemoteAction
    global static String ff() {

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.npoint.io/30855e03c0357e27a1c5');
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        String s = res.getBody();
         System.debug(s);

        return s;
    }
}
