 function login(){
        let main =document.getElementById("data");
        main.innerHTML=null;
        let sign =document.getElementById("signup");
        sign.innerHTML=null;
        main.style.backgroundColor="white";
        let form=document.getElementById("login");
        form.style.display="block";
        }

        function check(e){
            let form=document.getElementById("login");
            e.preventDefault();
            data={
            
            username:form.user.value,
            password:form.password.value,
            };
            console.log(data)
            dataSend=JSON.stringify(data);
            console.log(data)

            fetch("https://masai-api-mocker.herokuapp.com/auth/login",{
                method:'POST',
                body:dataSend,
                headers:{
                        'Content-Type':"application/json",
                    },
            })
            .then ((res)=>{
                return res.json();
            })
            .then((res)=>{
                console.log(res)
                console.log(data.username,res.token)
                fetchmyData(data.username,res.token);
            }) 
        }
        function fetchmyData(username, token){

        fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
        headers:{
                'Content-Type':"application/json",
                Authorization:`Bearer ${token}`,
            },
        })
        .then ((res)=>{
            return res.json();
        })
        .then((res)=>{
            document.getElementById("name").textContent=res.name;
            console.log(res)
        })
        }
    function signup(){
        let sign =document.getElementById("login");
        sign.innerHTML=null;
        let main =document.getElementById("data");
        main.innerHTML=null;
        main.style.backgroundColor="white";
        let form=document.getElementById("signup");
        form.style.display="block";
        
    }
    function getData(e){
        e.preventDefault();
        let form=document.getElementById("signup");
        let userData={
            name:form.name.value,
            email:form.email.value,
            password:form.password.value,
            username:form.user.value,
            mobile:form.mobile.value,
            description:form.description.value
        }
        userData=JSON.stringify(userData);
        console.log(userData)
        fetch("https://masai-api-mocker.herokuapp.com/auth/register",{
        method:'POST',
        body:userData,
        headers:{
            'Content-Type':"application/json",
        },
        })
        .then ((res)=>{
            return res.json();
        })
        .then((res)=>{
            let message=document.getElementById("message");
            message.textContent=res.message
            console.log(res)
        })
        .catch((er)=>{
            console.log(er)
        })
    }
    

    function searchMovie(){
        let movie=document.getElementById("movie").value;
        fetch(`http://www.omdbapi.com/?apikey=a1952697&t=${movie}&i`)
        .then(function (res){
           return res.json()
        })
        .then(function(data){
            show(data)
        })
        .catch(function(){
        let img=document.createElement("img");
        img.src="https://i.makeagif.com/media/11-04-2015/mfnzwt.gif";
        let par=document.getElementById("data");
            par.append(img);
            img.style.width="100%";
            par.style.padding="0";
            par.style.backgroundColor="white";
        })
     
    }
    function show(item){

        let par=document.getElementById("data");
        par.style.padding="20px"
        par.innerHTML=null;

        let div=document.createElement("div");
        let img=document.createElement("img");
        img.src=item.Poster;
        let name=document.createElement("h3");
        name.textContent=`Title: ${item.Title}`;
        let rating=document.createElement("p");
        rating.textContent=`Ratings: ${item.Ratings[0].Value}`;
        if(Number(item.Ratings[0].Value[0])>=8){
            var com=document.createElement("div");
            com.textContent="RECOMMENDED";
            com.style.backgroundColor='red';
            com.style.border='0.5px solid black';
            com.style.color='black';
            div.append(com)
           console.log("HH")
        }
        let lang=document.createElement("p");
        lang.textContent=`Language: ${item.Language}`;
        let production=document.createElement("p");
        production.textContent=`Production: ${item.Production}`;
        let actors=document.createElement("p");
        actors.textContent=`Actor: ${item.Actors}`;
        let director=document.createElement("p");
        director.textContent=`Director: ${item.Director}`;

        div.append(name,img,actors,director,lang,rating,production);

        data.append(div);
    }
