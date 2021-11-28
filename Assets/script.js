
//clear calendar button (reset)
function clearSearch(){
    localStorage.clear()
    location.reload()
    }
    
    $(".clearsearch").on("click",clearSearch);