/* HTTP Status code da testare: 
1. createSession:
1.2 HTTP status 400: Dati sessione mancanti
1.3 HTTP status 201: Articolo creato
1.4 HTTP status 500: Errore generico
*/

const {expect}= require('chai');
const sinon = require ("sinon");

const {createSession} = require("../../../controllers/sessionController");
const Session = require ("../../../models/Session");

describe("createSession Controller", async () => {

    afterEach(()=>{
        sinon.restore();
    });

    it('should return 400 if required fields are missing', async ()=> {
        //ARRANGE
        const req = {
            body: {
                sessionId: "123fakeId",
                name: "fakeSessionName",
                messages: null
            }
        };
        const createStub = sinon.stub(Session, 'create');

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //ACT
        await createSession(req, res);

        //ASSERT
        expect(res.status.calledWith(400)).to.be.true;
        expect(createStub.notCalled).to.be.true;
        expect(res.json.calledWith({message: "Dati sessione mancanti"})).to.be.true;
    });

    it ('should create a new session and return 201', async () => {
        //ARRANGE
        const req = {
            body: {
                sessionId: "123fakeId",
                name: "fakeSessionName",
                messages: "test"
            }
        };

        const fakeSession = {
            sessionId: "123fakeId",
            name: "fakeSessionName",
            messages: "test",
            _id: "123fakeSessionId"
        };

        const createStub = sinon.stub(Session, 'create').resolves(fakeSession);
          
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //ACT
        await createSession (req, res);

        //ASSERT
        expect(res.status.calledWith(201)).to.be.true;
        expect(createStub.calledOnce).to.be.true;
        expect(createStub.calledWithMatch({
            sessionId: "123fakeId",
            name: "fakeSessionName",
            messages: "test"
        })).to.be.true;
        expect(res.json.calledOnce).to.be.true;
    });

    it('should return 500 if database throw error', async ()=> {
        //ARRANGE
        const req = {
            body: {
                sessionId: "123fakeId",
                name: "fakeSessionName",
                messages: "test"
            }
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

         const createStub = sinon.stub(Session, 'create').rejects(new Error("DB failure"));

         //ACT
         await createSession(req, res);

         //ASSERT
         expect(res.status.calledWith(500)).to.be.true;
         expect(res.json.calledWithMatch({message: "DB failure"})).to.be.true;
    });
})