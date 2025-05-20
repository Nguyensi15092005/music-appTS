const fs = require("fs-extra");
const listFolderCopy = [
    {
        sourceDirectory: "views",
        targetDirectory: "dist/view"
    },{
        sourceDirectory: "public",
        targetDirectory: "dist/public"
    }
]

listFolderCopy.forEach(item =>{
    fs.copy(item.sourceDirectory, item.targetDirectory, (error)=>{
        if(error){
            console.log(`Lỗi sao chép thư mục ${item.sourceDirectory}: `, error);
        }
        else{
            console.log(`sao chép thành công thư mục ${item.sourceDirectory}`);
        }
    });
});