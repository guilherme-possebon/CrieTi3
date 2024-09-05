let currentDate = new Date();
let currentYear = currentDate.getFullYear();

let html = `

    <p>&copy;${currentYear}</p>
    <ul class="contactsList">
    <li>
        <a
        href="https://www.linkedin.com/in/guilherme-possebon-4652a625a/"
        target="_blank"
        >
        LinkedIn
        </a>
    </li>
    <li>
        <a href="mailto:gpossebon67@gmail.com" target="_blank">Email</a>
    </li>
    <li>
        <a href="https://wa.me/5197618801" target="_blank">Whatsapp</a>
    </li>
    </ul>
`;

document.getElementById("footerInfos").innerHTML = html;
