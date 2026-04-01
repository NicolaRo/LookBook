/* HTTP Status code da testare
1. deleteSession:
    1.2 HTTP status 404: Session non trovata
    2.2 HTTP status 200: Session cancellata
    2.3 HTTP status 500: Errore generico  
*/

const {expect} = require ('chai');
const sinon = require ('sinon');

//Importo sessionController contenente le funzioni che voglio testare
const sessionController = require ('../../../controllers/sessionController');
const Session = require('../../../models/Session');

//Descrivo il gruppo di test relativo al controller
describe ('deleteSession Controller', async ()=> {
    afterEach ( ()=> {
        sinon.restore();
    });

    // *** SCENARIO 1: SUCCESSO ***

    it ('should return 200 and delete confirmation', async () => {

        //ARRANGE 
        const fakeSession = {
            sessionId: "123fakeId",
            name: "fakeSessionName",
            messages: null
        };
        //Stub di Session.find
        const findStub = sinon.stub(Session, 'findOneAndDelete').resolves(fakeSession);

        //Creo req passata dal client con la query 
        const req = {
            params: {id: '123fakeId'}
        };

        //Creo una res con sinon.spy per controllare cosa viene inviato
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //ACT
        await sessionController.deleteSession(req, res);

        //ASSERT
        expect(findStub.calledOnceWith({sessionId: '123fakeId'})).to.be.true;
        expect(res.status.calledOnceWith(200)).to.be.true;
        expect(res.json.calledOnceWithMatch({message: "Sessione eliminata con successo"})).to.be.true;
    });

    // *** SCENARIO 2: FALLISCE ***

    it('should return 404 when a session is not found', async ()=> {

        //ARRANGE
        const findOneStub = sinon.stub(Session, 'findOneAndDelete').resolves(null);

        const req = {params: {id: 'nonexistent-id'} };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //ACT
        await sessionController.deleteSession(req, res);

        //ASSERT
        expect (findOneStub.calledOnceWith ({sessionId: 'nonexistent-id'})).to.be.true;
        expect(res.status.calledOnceWith(404)).to.be.true;
        expect(res.json.calledOnceWithMatch({message: "Impossibile eliminare, sessione non trovata"})).to.be.true;
    });

    it('should return 500 if database throw error', async() => {
            

        //ARRANGE
        const findOneStub = sinon.stub(Session, 'findOneAndDelete').rejects(new Error("DB failure"));

        const req = {params: {id: 'any-id'} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //ACT
        await sessionController.deleteSession(req, res);

        //ASSERT
        expect(findOneStub.calledOnce).to.be.true;
        expect (res.status.calledOnceWith(500)).to.be.true;
        expect(res.json.calledWithMatch({message: "DB failure"})).to.be.true;
    });
});