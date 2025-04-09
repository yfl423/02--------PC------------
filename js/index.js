window.onload = function(){
    let navPath = document.getElementsByClassName("navPath")[0];
    let pathData = goodData.path;

    // console.log(pathData);
    // console.log(navPath);

    for(let i = 0; i < pathData.length; i++){
        if(i == pathData.length -1){
            let data = pathData[i];
            let aNode = document.createElement("a");
            aNode.innerText = data.title;
            navPath.appendChild(aNode);
            return;
        }


        let data = pathData[i];
        let aNode = document.createElement("a");
        aNode.innerText = data.title;
        aNode.href = data.url;
        let iNode = document.createElement("i");
        iNode.innerText = '/';
        navPath.appendChild(aNode);
        navPath.appendChild(iNode);
    }
}