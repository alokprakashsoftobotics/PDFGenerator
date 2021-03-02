let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const fs = require('fs');

export async function generatePdf(req, res) {
    try {
        const { headerLeft, headerRight, tableData, leftImage, rightImage } = req.body;
        ejs.renderFile(path.join(__dirname, '../views/', "pdf.ejs"), {
            headerLeft: headerLeft,
            headerRight: headerRight,
            tableData: tableData,
            leftImage: leftImage,
            rightImage: rightImage
        }, (err, data) => {
            if (err) {
                console.log(err)
                res.send(err);
            } else {
                let options = {
                    "height": "11.25in",
                    "width": "8.5in",
                    "header": {
                        "height": "20mm",
                    },
                    "footer": {
                        "height": "20mm",
                    },
                };
                pdf.create(data, options).toFile("report.pdf", function (err, data) {
                    if (err) {
                        throw err;
                    } else {
                        var data =fs.readFileSync('report.pdf');
                        res.contentType("application/pdf");
                        res.send(data);
                    }
                });
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error: error.message || error,
            message: 'Something went wrong!'
        });
    }
}

