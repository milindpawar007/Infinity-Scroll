const imageContainer =document.getElementById('image-conatiner');
const loader = document.getElementById('loader');  
let ready= false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];

// Unplash API
let count=5;
const apiKey='qYZIxxyBy2LMgP1cj9WFbUwIDqqGR2eFPf-nDvgy3ZQ';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images is loaded
function imageLoaded()
{
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        count=30;
    }
}
// Helper functiom to Set Attributes on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes)
    {
         element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for photos , add to Dom
function  displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    photosArray.forEach((photo) =>
    {       console.log(photo);
            // create <a> to link unplash 
            const item = document.createElement('a');
            // item.setAttribute('href',photo.links.html);
            // item.setAttribute('target','_blank');

            // create <img> for photo
            setAttributes(item, {href:photo.links.html, 
                 target:'_blank'});
             const img = document.createElement('img');
            //  img.setAttribute('src',photo.urls.regular);
            //  img.setAttribute('alt',photo.alt_description);
            //  img.setAttribute('title',photo.alt_description);
            setAttributes(img, {
                src:photo.urls.regular, 
                alt:photo.alt_description,
                title:photo.alt_description});
            // Event Listener ,Check when each is finished loading
            img.addEventListener('load',imageLoaded);
            // Put img inside <a> tag,then put inside image Container Element
            item.append(img);
            imageContainer.append(item);
            
    });
}

// get photos from api

async function getPhotos(){
    try 
    {
        const response = await fetch(apiUrl);
        photosArray =await response.json();
        console.log(photosArray);
        displayPhotos();
       
    } catch (error) {
        
    }
}
// check if scrolling near to bootom of page , load more photos
window.addEventListener('scroll',()=>
{
   if(window.innerHeight + window.scrollY>=document.body.offsetHeight-1000 && ready)
   {
       ready=false;
       getPhotos();
   }
});
// on load
getPhotos();

