const styles = `/** Font related global styles */
@import url('https://fonts.googleapis.com/css?family=Roboto');

html, body {
    font-family: 'Roboto', sans-serif;
    font-size: 4mm;
}

/** Component styles */
.component--LayoutTheme {
    padding: 0;
    margin: 0;
}

html, body {
    padding: 0;
    margin: 0;
}

/** Form related global styles */
form fieldset {
    border: 0;
    margin: 0.2em;
    padding: 0;
    position: relative;
    text-align: center;
}
form fieldset input {
    display: inline-block;
    width: calc(100% - 1.4em);
    font-size: 1em;
    line-height: 1.5em;
    height: 1.5em;
    margin: 0;
    padding: 0.2em 0.5em;
    border: thin solid #e0e0e0;
}
form button {
    font-size: 1em;
    padding: 0.2em 0.5em;
    border: thin solid #e0e0e0;
    border-radius: 2px;
}
form .buttons {
    text-align: right;
}
form textarea {
    width: calc(100% - 1.4em);
    font-size: 1em;
    margin: 0;
    border: thin solid #e0e0e0;
    padding: 0.2em 0.5em;
}`;

export default styles;