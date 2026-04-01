/* HTTP Status code da testare
2. getSession & getSessionById:
    2.1 HTTP status 404: IdArticolo non trovato
    2.2 HTTP status 200: Restituisce articolo
    2.3 HTTP status 500: Errore generico  
*/

    const {expect} = require ('chai');
    const sinon = require ('sinon');

    //Importo sessionController contenente le funzioni che voglio testare
    const sessionController = require ('../../../controllers/sessionController');
    const Session= require ('../../../models/Session');

    //Descrivo il gruppo di test relativo al controller
    describe ('getSession Controller', () => {

        //afterEach dopo ogni test ripulisce gli stub
        afterEach(()=>{
            sinon.restore();
        });

        // *** SCENARIO 1: SUCCESSO ***

        it('should return 200 and all sessions when DB call succeeds', async () => {
            
            //ARRANGE
            const fakeSession = [{
                sessionId: "123fakeId",
                name: "fakeSessionName",
                messages: null
            }];

            //Stub di Session.find
            const findStub = sinon.stub(Session, 'find').resolves(fakeSession);

            //Creo req passata dal client con la query 
            const req = {query: {} };

            //Creo una res con sinon.spy per controllare cosa viene inviato
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            //ACT 
            //Chiamo il controller con i finti req / res
            await sessionController.getSession(req, res);

            //ASSERT
            expect(findStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWithMatch(fakeSession)).to.be.true;
        }); 

        /* it('should return 200 and empty array when no sessions are found', async () => {
            //ARRANGE
            const findStub = sinon.stub(Session, 'find').resolves([]);

            const req ={query: {} };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            //ACT
            await sessionController.getSession(req, res);

            //ASSERT
            expect(findStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            
        }); */

        //*** SCENARIO 2: FALLISCE ***

        it('should return 500 if database throw error', async () => {

            //ARRANGE
            const findOneStub = sinon.stub(Session, 'findOne').rejects(new Error("DB failure"));

            const req = {params:  {id: 'any-id'} };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            //ACT
            await sessionController.getSessionById(req, res);

            //ASSERT
            expect(findOneStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledWithMatch({message: "DB failure"})).to.be.true;
        });

        it('should return 404 when a session is not found', async()=> {
            //ARRANGE 
            const findOneStub = sinon.stub(Session, 'findOne').resolves(null);

            const req = {params: {id: 'nonexistent-id'} };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            //ACT
            await sessionController.getSessionById(req, res);

            //ASSERT
            expect(findOneStub.calledOnceWith ({sessionId: 'nonexistent-id'})).to.be.true;
            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.json.calledOnceWithMatch({message: "ID Sessione non trovato"})).to.be.true;
        });
    });