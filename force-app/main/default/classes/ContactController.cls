public class ContactController {
	 @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT FirstName, LastName, Email
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY FirstName
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [Select Id,Name,Industry from Account];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsfromAcc(string accsearch){
        return [SELECT FirstName, LastName, Email
            FROM Contact where Account.Name=:accsearch
            ];
    }
}