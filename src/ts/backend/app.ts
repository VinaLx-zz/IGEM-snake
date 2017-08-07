import * as express from "express"
import * as path from "path"

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "../node_modules")));
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use("/fonts", express.static(path.join(__dirname, "../fonts")))
app.use(express.static(__dirname));

app.listen(port, "0.0.0.0", () => {
    console.log(`listening on port ${port}`)
});