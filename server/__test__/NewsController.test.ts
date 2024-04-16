import request from 'supertest';
import { app, server } from '../app';
import connection_db from '../database/connection_db';
import NewsModel from '../models/NewsModel';
import UserModel from '../models/UserModel';
import { newsTest, adminTest } from '../__test__/test-helpers/helperTest';
import { createToken } from '../utils/jwt';


const api = request(app);


describe('Testing News CRUD', () => {

    let userId = "";
    let token = "";
    let newsId = "";

    beforeAll(async () => {
        const user:any = await UserModel.create(
            adminTest
        );
        userId = await user?.get('id').toString();
        token = await createToken(user);
        console.log(token + "Hola desde test")
    });


    describe('GET', () => {
        test('Get response must be an array and then show 200 status ', async() => {
            const response = await api.get('/api/news').set('Authorization', `Bearer ${token}`);
            // expect(response.body).toBeInstanceOf(Array)
            console.log(response)
            expect(response.status).toBe(200)
        })    
    });


    describe('POST', () => {

        test("Users create a new post", async()=>{
            const response = await api
            .post('/api/news').set('Authorization', `Bearer ${token}`)
            .send(newsTest);
            console.log(response.body)

            expect(response.status).toBe(201);
            expect(response.body.content).toBeDefined();
            expect(response.body.title).toBeDefined();
        })
        
        afterAll(async () => {
            await NewsModel.destroy({
                where: {
                    title: "Test"
                }
            }); 
            
        });
    })

    describe('DELETE', () => {
        let newTestPost;
        let response;

        beforeEach(async() => {
            newTestPost = await api.post('api/news').set('Authorization', `Bearer ${token}`).send(newsTest);
            console.log(newTestPost.body)
            
            response = await api.delete(`api/news/${newTestPost.body.id}`).set('Authorization', `Bearer ${token}`).send()
        });

        test('Delete method should be 200 status', () => {
            expect(response.status).toBe(200)
        })
    })

    // describe('DELETE', () => {
    //     test("Delete a post", async () => {
    //         const response = await api.delete(`/api/news/${newsId}`).set('Authorization', `Bearer ${token}`);
    //         expect(response.status).toBe(200);
    //     });
    // });

    // describe('PUT', () => {
    //     test("Update a post", async () => {
    //         const updatedNews = {
    //             title: "Updated Title",
    //             content: "Updated Content"
    //         };

    //         const response = await api.put(`/api/news/${newsId}`).set('Authorization', `Bearer ${token}`).send(updatedNews);
    //         expect(response.status).toBe(200);
    //     });
    // });


    afterAll( async () => {
        await UserModel.destroy({
            where: {
                id: userId
            }
        });
        server.close();
        connection_db.close();
    });

});