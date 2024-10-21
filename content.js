
function extractEmailsFromComments() {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    commentDOC="div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs"
    const comments = commentDOC.querySelectorAll('div');
    let emails = [];
    comments.forEach(comment => {
        const commentText = comment.innerText || '';
        const foundEmails = commentText.match(emailRegex);
        if (foundEmails) {
            emails.push(...foundEmails);
        }
    });
    return emails;
}




function injectButtonWithDelay(targetDiv, delay = 4000) {
    setTimeout(() => {
        const insideDiv = ".x9f619.x1ja2u2z.x78zum5.x2lah0s.x1n2onr6.x1qughib.x1qjc9v5.xozqiw3.x1q0g3np.xykv574.xbmpl8g.x4cne27.xifccgj";
        const innermostDiv = targetDiv.querySelector(insideDiv);

        if (innermostDiv) {
            console.log("Was Found!")
            const button = document.createElement('div');
            button.innerText = 'Extract Emails';
            button.id='Email-Extract-btn'
            innermostDiv.appendChild(button);

            button.addEventListener('click', () => {
                const emails = extractEmailsFromComments();
                if (emails.length > 0) {
                    alert(`Found emails: \n${emails.join('\n')}`);
                } else {
                    alert("No emails found in the comments.");
                }
            });
        } else {
            console.log("innermostDiv not found after delay.");
        }
    }, delay);  
}






function observeDOMForTargetDiv() {
    const body = document.body;

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const targetDiv = document.querySelector('div.__fb-light-mode.x1n2onr6.xzkaem6');
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
