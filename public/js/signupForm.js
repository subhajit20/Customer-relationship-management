const mySignupFrom = document.getElementById("mySignupFrom");

const username = document.getElementById("myName");
const email = document.getElementById("myEmail");
const password = document.getElementById("myPassword");


mySignupFrom.addEventListener("click",async (e)=>{
    e.preventDefault();
    
    
    const data = await fetchSignup();
    console.log(data.errors)
})
async function fetchSignup(){

    let n = username.value;
    let e = username.value;
    let p = username.value;
    const res = await fetch("/signup",{
        method:"POST",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify({
            n,e,p
        })
    });
    const data = await res.json();
    
    if(res.status === 200){
        return data;
    }else{
        return data;
    }
}