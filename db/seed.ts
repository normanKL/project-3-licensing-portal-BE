//- ./db/seed.ts

import mongoose from "mongoose";
import Specialists from "../models/Specialist";
import Takaful, { ITakaful } from "../models/Takaful";
import LifeInsurance, { ILifeInsurance } from "../models/LifeInsurance"
import Users from "../models/User"
import dotenv from 'dotenv'
dotenv.config()


async function seed() {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to the database! 🔥')

    await Specialists.deleteMany({});
    await Takaful.deleteMany({});
    await LifeInsurance.deleteMany({});
    await Users.deleteMany({});


    const adminUser = [
        {
            "username": "Chan Wai Mun",
            "email": "ChanWaiMun@hbbc.com",
            "password": "Hbbc1234#",
            "designation": "Licensing Specialist",
            "region": "Northern 1",
            "branch": "HQ",
            "image": "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/19429e76-4674-49d8-99ae-18d347ac477b/b065fae7-5fa6-4c2a-876e-29ab3d9b1883.png",
        },
        {
            "username": "Siva A/L Subramaniam",
            "email": "Siva@hbbc.com",
            "password": "Hbbc2345#",
            "designation": "Licensing Specialist",
            "region": "Central 1",
            "branch": "HQ",
            "image": "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/4eb7468d-4448-4762-80d9-511e610304bc/96a0b93f-a00c-4a91-b176-595c3f1bbb37.png",
        },
        {
            "username": "Helena Peterson",
            "email": "Helena@hbbc.com",
            "password": "Hbbc4567#",
            "designation": "Licensing Specialist",
            "region": "Southern",
            "branch": "HQ",
            "image": "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/d19f6568-b880-433a-99c2-bd4cbd3a988c/d3b87449-923d-4db3-bddf-41e82a6009a3.png",
        },

    ]

    const users = await Users.create(adminUser)

    const lifeInsurances: ILifeInsurance[] = await LifeInsurance.create(
        [
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
            {
                completed: 'Module A',
                pending: 'Module C',
                licensing: 'Pending exam',
                status: 'Pending exam'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
        ]
    )

    const takafuls: ITakaful[] = await Takaful.create(
        [
            {
                completed: 'Module A',
                pending: 'Module C',
                licensing: 'Pending exam',
                status: 'Pending exam'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            },
            {
                completed: 'Module A & C',
                pending: 'None',
                licensing: 'Completed',
                status: 'Completed'
            }
        ]
    )

    const specialists = [
        {
            image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/7baad9e0-6c16-4f26-a94a-f4fcfa103caf/7af52662-754f-4e0f-b0dd-3e945c5cdeaf.png',
            name: 'Krishna A/P Saravanan',
            email: 'Krishna@hbbc.com',
            designation: 'Senior RM',
            region: 'Northern 1',
            branch: 'Penang',
            insurance: lifeInsurances[0]._id,
            takaful: takafuls[0]._id,
            user: users[0]._id,
            comment: []
        }, 
        {
            image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/5af6e7b6-523a-4e9e-bd50-8e5e00b8d4b6/062fe210-6354-483c-967a-63379b5a8c65.png',
            name: 'Gina Gan',
            email: 'GinaGan@hbbc.com',
            designation: 'Acquisition RM',
            region: 'Central 1',
            branch: 'Cheras',
            insurance: lifeInsurances[1]._id,
            takaful: takafuls[1]._id,
            user: users[1]._id,
            comment: []
        },
        {
            image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/8a8096ae-bdbf-480e-a053-760d699da41c/6bac12f0-f61a-4ed3-bede-d45277d5335c.png',
            name: 'Jojo Anak Henry',
            email: 'Jojo@hbbc.com',
            designation: 'Insurance Specialist',
            region: 'Central 1',
            branch: 'Damansara',
            insurance: lifeInsurances[2]._id,
            takaful: takafuls[2]._id,
            user: users[1]._id,
            comment: []  
        },
        {
            image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/80d336fc-2034-4b10-8dd2-8eb15f6aa898/795e92f1-9b26-4452-a27c-47fa491492f2.png',
            name: 'Foong Koh Wai',
            email: 'FoongKohWai@hbbc.com',
            designation: 'Insurance Specialist',
            region: 'Northern 1',
            branch: 'Ipoh',
            insurance: lifeInsurances[3]._id,
            takaful: takafuls[3]._id,
            user: users[0]._id,
            comment: []  
        },
        {
            image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/116e962d-c0e7-4fa7-bf2a-632abed10d6e/b7d52f90-a207-49d7-84a2-a37a59b5d2a5.png',
            name: ' Haslina Hisham',
            email: 'Haslina@hbbc.com',
            designation: 'Acquisition RM',
            region: 'Northern 1',
            branch: 'Ipoh',
            insurance: lifeInsurances[4]._id,
            takaful: takafuls[4]._id,
            user: users[0]._id,
            comment: []  
        },
        {
            image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/17b1593d-fecb-4684-bd4f-09f4fe3949b9/faa90aa0-3dfa-4756-844e-e9a4eb037880.png',
            name: 'Tong Wei Wei',
            email: 'TongWeiWei@hbbc.com',
            designation: 'Insurance Specialist',
            region: 'Southern',
            branch: 'Kulai',
            insurance: lifeInsurances[5]._id,
            takaful: takafuls[5]._id,
            user: users[2]._id,
            comment: []  
        },
    ]

    await Specialists.create(specialists)
    
    await mongoose.disconnect()

}

seed()