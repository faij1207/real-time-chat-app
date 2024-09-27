const chatModel=require("../Models/chatModel");

const createChat = async (req, res) => {
    const {firstId , SecondId}=req.body;

    try{
            const chat=await chatModel.findOne({
                members:{$all:[firstId,SecondId]},
            });
            if(chat){
                res.status(200).json({chat});
            }
            const newChat=new chatModel({
                members:[firstId,SecondId]
            });
            const response=await newChat.save();
            res.status(200).json(response);
    }catch(err){
        console.log(err);   
        res.status(500).json(err);
    }
};

const findUserChats=async(req,res)=>{
    const {userId}=req.params;
    try{
        const chats=await chatModel.find({members:{$in:[userId]}});
        res.status(200).json(chats);
    }catch(err){
        res.status(500).json(err);
    }
} 

const findChat=async(req,res)=>{
    const {firstId , SecondId}=req.params;
    try{
        const chat=await chatModel.find({
            members:{$all:[firstId,SecondId]}
        });
        res.status(200).json(chat);
    }catch(err){
        res.status(500).json(err);
    }
};

module.exports={createChat,findUserChats,findChat};