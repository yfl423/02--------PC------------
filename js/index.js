window.onload = function () {
    navPathDataRender();
    bigPictureBind();

    /**
     * 
     * @returns Render the navigation path of the product page.
     */
    function navPathDataRender() {
        let navPath = document.getElementsByClassName("navPath")[0];
        let pathData = goodData.path;

        // console.log(pathData);
        // console.log(navPath);

        for (let i = 0; i < pathData.length; i++) {
            if (i == pathData.length - 1) {
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


    function bigPictureBind() {
        let leftTop = document.getElementById("leftTop");
        let smallPic = document.getElementById("smallPic");
        console.log(smallPic);
    
        let mask;
        let bigPic;
    
        smallPic.onmouseenter = function () {
            // Create mask
            mask = document.createElement("div");
            mask.className = "mask";
            smallPic.appendChild(mask);
    
            bigPic = document.createElement("div");
            bigPic.id = "bigPic";
            let bigPicImg = document.createElement("img");
            bigPicImg.src = "images/b1.png";
            bigPic.appendChild(bigPicImg);
            leftTop.appendChild(bigPic);
        };


        // Move the mask and bigPic
        // The mask is moved according to the mouse position, and the bigPic is moved according to the mask position
        smallPic.onmousemove = function (event){
            let left  = Math.max(0,  Math.min(smallPic.clientWidth - mask.offsetWidth , event.clientX - smallPic.getBoundingClientRect().left - mask.offsetWidth / 2));
            let top = Math.max(0, Math.min(smallPic.clientHeight - mask.offsetHeight , event.clientY - smallPic.getBoundingClientRect().top - mask.offsetHeight / 2));
            mask.style.left = left + "px";
            mask.style.top = top + "px";
        }
    
        smallPic.onmouseleave = function () {
            // Delete mask & bigPic
            if (mask) {
                smallPic.removeChild(mask);
            }
            if (bigPic) {
                leftTop.removeChild(bigPic);
            }
        };
    }

}