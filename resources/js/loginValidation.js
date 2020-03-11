if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

function ready(){
    
    /*-----------------------------------------*/
    /* LOGIN VALIDATION */
    /*-----------------------------------------*/
    
    document.querySelector(".js--email").addEventListener("blur", function(){
        var val = this.value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val))
            {
                this.style.border = "1px solid #2ecc71";
            }
        else
            {
                this.style.border = "1px solid #c0392b";
                this.value = "";
            }
    });
    
    
    document.querySelector(".js--password").addEventListener("blur", function(){
        var val = this.value;
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(val))
            {
                this.style.border = "1px solid #2ecc71";
            }
        else
            {
                alert(
                    'Password should contain: \n\n' 
                    + "\t• 6 or more characters\n" 
                    + '\t• Atleast one digit\n' 
                    + '\t• At least one lowercase character\n' 
                    + '\t• At least one uppercase character' 
                  );
                this.style.border = "1px solid #c0392b";
                this.value = "";
            }
    });
}