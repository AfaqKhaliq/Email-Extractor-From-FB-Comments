

function autoScrollUntilEnd(targetDiv)
{
    return new Promise((resolve)=>{
        let lastScrollHeight = 0;
        let scrollAttempts = 0;

        function scrollToBottom() {
            targetDiv.scrollTop = targetDiv.scrollHeight;
            console.log(targetDiv.scrollTop)
            const currentScrollHeight = targetDiv.scrollHeight;

            if (currentScrollHeight > lastScrollHeight) {
                lastScrollHeight = currentScrollHeight;
                scrollAttempts = 0; 
            } else {
                scrollAttempts++;
            }

            if (scrollAttempts > 10) {
                clearInterval(scroller);
                console.log("Finished loading all comments.");
                resolve();
            }
        }

        const scroller = setInterval(scrollToBottom, 1000);
    });
}


function extractEmailsFromComments(targetDiv) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const commentSelector="div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs"
    const commentDOC = targetDiv.querySelectorAll(commentSelector);

    let emails = [];
    commentDOC.forEach(comment => {
        const commentText = comment.innerText || '';
        console.log(commentText);
        const foundEmails = commentText.match(emailRegex);
        if (foundEmails) {
            emails.push(...foundEmails);
        }
    });
    return emails;
}

function SelectTopComments(targetDiv)
{
    dropDown=targetDiv.querySelector('div.x6s0dn4.x78zum5.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xe0p6wg');
    dropDown=dropDown.querySelector('div');
    dropDown.click();
    setTimeout(()=>{
        list=targetDiv.querySelector('[aria-label="Comment Ordering"]')
        list=list.querySelector('div.x78zum5.xdt5ytf.x1iyjqo2.x1n2onr6');
        list=list.querySelector('div')
        list=list.querySelectorAll('div')
        list[14].click();
        dropDown.click();
    },300)

}

function waitForEelemnt(targetDiv,insideDiv,timeout=10000)
{
    return new Promise((resolve, reject) => {
        const intervalTime=100;
        let elapsedTime=100;
        const intervalId=setInterval(()=>{
            const innermostDiv = targetDiv.querySelector(insideDiv);
            if (innermostDiv) {
                clearInterval(intervalId); 
                console.log("Element found:", innermostDiv);
                resolve(innermostDiv);
            }

            elapsedTime += intervalTime;
            if (elapsedTime >= timeout) {
                clearInterval(intervalId); 
                console.log("Timeout: Element not found.");
                reject(new Error("Timeout: Element not found."));
            }

        },intervalTime)
 
    })
}

function downloadFile(emailText)
{
    const blob = new Blob([emailText], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'emails.txt';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Emails saved to emails.txt and download initiated.");
}

async function injectButtonWithDelay(targetDiv) {
    if (!document.getElementById('Email-Extract-btn')) {

        const insideDiv = ".x9f619.x1ja2u2z.x78zum5.x2lah0s.x1n2onr6.x1qughib.x1qjc9v5.xozqiw3.x1q0g3np.xykv574.xbmpl8g.x4cne27.xifccgj";

        try{
            const element=await waitForEelemnt (targetDiv, insideDiv)
            console.log("Was Found!")
            const button = document.createElement('button');
            button.innerText = 'Extract Emails';
            button.id='Email-Extract-btn'
            element.appendChild(button);

            button.addEventListener('click', async() => {
                SelectTopComments(targetDiv);
                const scrollableDiv =targetDiv.querySelector('.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf.x6ikm8r.x1ja2u2z.x1pq812k.x1rohswg.xfk6m8.x1yqm8si.xjx87ck.xx8ngbg.xwo3gff.x1n2onr6.x1oyok0e.x1odjw0f.x1iyjqo2.xy5w88m'); 
                await autoScrollUntilEnd(scrollableDiv);
                const emails = extractEmailsFromComments(targetDiv);
                if (emails.length > 0) {
                    alert("Text File Containing Emails Will Be Downloaded");
                    const emailText = `Found emails:\n${emails.join('\n')}`;

                    console.log(emailText);
                    downloadFile(emailText)

                } else {
                    console.log("No emails found in the comments.");
                    alert("No Emails Found!");
                }
            });
        }
        catch (error) {
            console.error(error.message);
            alert("Element not Found Timeout.\nTry Again")
        }
    }

}
   






function observeDOMForTargetDiv() {
    let ProcessingDialog=false;
    const body = document.body;
    document.querySelectorAll
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const targetDiv = document.querySelector('.__fb-light-mode.x1n2onr6.xzkaem6, .__fb-dark-mode.x1n2onr6.xzkaem6');
                if (targetDiv && !ProcessingDialog) {
                    if (!document.getElementById('Email-Extract-btn')) {
                    injectButtonWithDelay(targetDiv);
                    ProcessingDialog=true;
                    //observer.disconnect(); 
                    //break;
                    }
                }
                else if(targetDiv=== null && ProcessingDialog)
                {
                    ProcessingDialog=false;
                }
            }
        }
    });

    observer.observe(body, { childList: true, subtree: true });
}


observeDOMForTargetDiv();


