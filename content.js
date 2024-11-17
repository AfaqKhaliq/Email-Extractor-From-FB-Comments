


function autoScrollUntilEnd(targetDiv)
{
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
        }
    }

    const scroller = setInterval(scrollToBottom, 1000);
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
    list=targetDiv.querySelector('[aria-label="Comment Ordering"]')
    list=list.querySelector('div.x78zum5.xdt5ytf.x1iyjqo2.x1n2onr6');
    list=list.querySelector('div')
    console.log(list);
    list=list.querySelectorAll('div')
    list[2].click();
    dropDown.click();
}



function injectButtonWithDelay(targetDiv, delay = 10000) {
    setTimeout(() => {
        const insideDiv = ".x9f619.x1ja2u2z.x78zum5.x2lah0s.x1n2onr6.x1qughib.x1qjc9v5.xozqiw3.x1q0g3np.xykv574.xbmpl8g.x4cne27.xifccgj";
        const innermostDiv = targetDiv.querySelector(insideDiv);
        console.log(innermostDiv);
        if (innermostDiv) {
            console.log("Was Found!")
            const button = document.createElement('button');
            button.innerText = 'Extract Emails';
            button.id='Email-Extract-btn'
            innermostDiv.appendChild(button);

            button.addEventListener('click', () => {
                SelectTopComments(targetDiv);
                const scrollableDiv =targetDiv.querySelector('.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf.x6ikm8r.x1ja2u2z.x1pq812k.x1rohswg.xfk6m8.x1yqm8si.xjx87ck.xx8ngbg.xwo3gff.x1n2onr6.x1oyok0e.x1odjw0f.x1iyjqo2.xy5w88m'); 
                autoScrollUntilEnd(scrollableDiv);
                const emails = extractEmailsFromComments(targetDiv);
                if (emails.length > 0) {
                    alert(`Found emails: \n${emails.join('\n')}`);
                } else {
                    console.log("No emails found in the comments.");
                }
            });
        } else {
            console.log("innermostDiv not found after delay.");
        }
    }, delay);  
}






function observeDOMForTargetDiv() {
    const body = document.body;
    document.querySelectorAll
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const targetDiv = document.querySelector('.__fb-light-mode.x1n2onr6.xzkaem6');
                if (targetDiv) {
                    injectButtonWithDelay(targetDiv);
                    observer.disconnect(); 
                    break;
                }
            }
        }
    });

    observer.observe(body, { childList: true, subtree: true });
}


observeDOMForTargetDiv();


//class=".x14nfmen.x1s85apg.x5yr21d.xds687c.xg01cxk.x10l6tqk.x13vifvy.x1wsgiic.x19991ni.xwji4o3.x1kky2od.x1sd63oq"
//class=".x9f619.x1s85apg.xds687c.xg01cxk.xexx8yu.x18d9i69.x1e558r4.x150jy0e.x47corl.x10l6tqk.x13vifvy.x1n4smgl.x1d8287x.x19991ni.xwji4o3.x1kky2od"
