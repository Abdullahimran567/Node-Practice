const http = require('http');
const fs = require('fs');
const url = require('url');

let id = 0;

const server = http.createServer((req, res) => {

    const { method } = req;

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === "/" && method === "GET") {
        return res.end(JSON.stringify({
            message: "Welcome to the To do list app"
        }));
    }

    if (pathname === "/tasks" && method === "GET") {
        fs.readFile("./data.json", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "File read error" }));
            }

            let tasks = JSON.parse(data || "[]");

            const {status} = parsedUrl.query;

            if(status != undefined) {
                tasks = tasks.filter((item) => item.status == status);
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                message: "Successful",
                data: tasks
            }));
        });
    }

    if (pathname === "/addTask" && method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const task = JSON.parse(body);
            task.id = id++;

            fs.readFile("./data.json", "utf-8", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: "File error" }));
                }

                const tasks = JSON.parse(data || "[]");

                tasks.push(task);

                fs.writeFile("./data.json", JSON.stringify(tasks), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify({ message: "Write error" }));
                    }

                    res.writeHead(200, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({
                        message: "Task added",
                        task
                    }));
                });
            });
        });
    }

    if (method === "GET" && pathname.startsWith("/tasks/")) {

        const parts = pathname.split("/");
        const taskId = Number(parts[2]);

        fs.readFile("./data.json", "utf-8", (err, data) => {

            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "File error" }));
            }

            const tasks = JSON.parse(data || "[]");

            const task = tasks.find(t => t.id === taskId);

            if (!task) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({
                    message: "Task not found"
                }));
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
                message: "Task found",
                data: task
            }));
        });
    }


    if(method == "PATCH" && pathname.startsWith("/updateTask/")) {

        let body = ""
    
        req.on("data" , chunck => {
            body += chunck;
        })

        req.on("end" , ()=> {
                const taskupdate = JSON.parse(body);
              const parts = pathname.split('/');
        const id = Number(parts[2]);

        fs.readFile("./data.json" , "utf-8" , (err , data)=> {
            if(err) {
                 res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: "File error" }));
            }

            const tasks = JSON.parse(data || "[]");
            const index = tasks.findIndex(item => item.id===id);


              if (index === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Task not found" }));
            }

            tasks[index] = {...tasks[index] , ...taskupdate }


            fs.writeFile("./data.json" , JSON.stringify(tasks) , (err)=> {
                if(err) {

                    res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: "File error" }));
                }

                res.writeHead(200 , {"content-type" : "application/json"});
                res.end(JSON.stringify({message : "Data successfullly updated" }))
            })
        })

        })

      
    }

});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});