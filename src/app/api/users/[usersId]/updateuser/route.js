import {getResponseMessage} from "../../../../../helper/getResponseMessage";
import {User} from "../../../../../models/user";
import {deletePhoto, uploadPhoto} from "../../../../api/cloudImage/route";


export const PUT=async (request,{params})=>{
    const { usersId }=params;
    const {name,mobile,secure_url,public_id}=await request.json();

    try {
        console.log(usersId);
        console.log(name,mobile,secure_url,public_id);

        let updatedSecureUrl = secure_url;
        let updatedPublicId=public_id;// Initialize the updatedSecureUrl variable

        if (!secure_url.startsWith("https://res.cloudinary.com")) {
            const ImageData = await uploadPhoto(secure_url);
            await deletePhoto(updatedPublicId);
            updatedSecureUrl = ImageData.secure_url;
            updatedPublicId= ImageData.public_id;

            // Update secure_url with the new value
        }

        const updateUser = await User.updateOne(
            {
                _id: usersId,
            },
            {
                $set: {
                    name: name,
                    mobile: mobile,
                    secure_url: updatedSecureUrl,
                    public_id:updatedPublicId// Use the updated secure_url
                },
            }
        );
        return getResponseMessage(updatedPublicId,200,true);

    }
    catch (e) {
        console.log(e);
        return getResponseMessage("Failed to Update User Detail",500,false);


    }
}