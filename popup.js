const btn = document.querySelector('.colorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click',async () =>{
    let [tab] = await chrome.tabs.query({active : true, currentWindow : true});
    // console.log(tab+" 1st");
    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        function : pickColor,
    }, async(injectioResult) => {

        const [data] = injectioResult;

        if(data.result)
        {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerHTML = ""+color;

            try {
               await navigator.clipboard.writeText(color);
            } catch(err)
            {
                console.error(err);
            }
        }
        // console.log(injectioResult+" 3rd");
    });
});

async function pickColor(){
    // console.log("Script Working 2nd");

    try {
        const eyeDropper = new EyeDropper();
        
        const selectedColor = await eyeDropper.open();
        // console.log(selectedColor);
        return selectedColor;
    } catch(err)
    {
        console.error(err);
    }
}