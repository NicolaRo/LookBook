/* HTTP Status code da testare
2. getArticleById:
    2.1 HTTP status 404: IdArticolo non trovato
    2.2 HTTP status 200: Restituisce articolo
    2.3 HTTP status 500: Errore generico  
3. updateArticle:
    3.1 HTTP status 404: Id articolo non trovato
    3.2 HTTP status 500: Errore generico
    3.3 HTTP status 200: Articolo aggiornato*/

    const {expect} = require ('chai');
    const sinon = require ('sinon');

    //Importo articleController contentente le funzioni che voglio testare
    const articleController = require ('../../../controllers/articleController');
    const Article = require ('../../../models/Article');

    //Descrivo il gruppo di test relativo al controller
    describe('updateArticle Controller', ()=>{

        //afterEach dopo ogni test ripulisce gli stub
        afterEach(()=> {
            sinon.restore();
        });

        // *** SCENARIO 1: SUCCESSO 
        it('should update an existing article and return 200', async ()=> {

            //ARRANGE
            const req = {
                params: { id: '123fakeId' },
                body: {
                    categoria: 'Abbigliamento uomo',
                    brand: 'DSQUARED2',
                    stato: 'nuovo',
                    foto: 'foto1',
                    valutazione: '100,00€'
                },
            };

            //Creo una res con sinon.spy per controllare cosa viene inviato
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            //Creo fakeArticle aggiornato, cioè quello che il DB restituirebbe
            const fakeUpdatedArticle = {
                _id: '123fakeId',
                ...req.body
            };

            //Stubbo Article.findByIdAndUpdate per simulare il DBB
            const updateStub = sinon.stub(Article, 'findByIdAndUpdate').resolves(fakeUpdatedArticle);

            //ACT
            //Chiamo il controller con i finti req e res
            await articleController.updateArticle(req, res);

            //ASSERT
            //Controllo che la funzione abbia chiamato il DB con ID e body corretti
            expect(updateStub.calledOnce).to.be.true;
            expect(updateStub.calledWith(
                '123fakeId',
                req.body,
                {new: true }
            )).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWith(fakeUpdatedArticle)).to.be.true;
        });

        it('should return 404 if the article ID does not exist', async ()=> {

            //ARRANGE
            const req = {
                params: {id: 'nonexsistent-id'},
                body:{
                    categoria: 'test'
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            //Stub di findByIdAndUpdate per simulare ID inesistente (ritorna null)
            const updateStub =sinon.stub(Article, 'findByIdAndUpdate').resolves(null);

            //ACT
            await articleController.updateArticle(req, res);

            //ASSERT
            //Verifica che il DB sia chiamato con i parametri corretti
            expect (updateStub.calledOnce).to.be.true;
            expect(updateStub.firstCall.args[0]).to.equal('nonexsistent-id');
            expect(updateStub.firstCall.args[1]).to.deep.equal(req.body);
            expect(updateStub.firstCall.args[2]).to.deep.equal({new: true});
            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.json.calledOnceWithMatch({message: 'Articolo non trovato'})).to.be.true;
        });

        it('should return 500 if the DB fails', async ()=> {

            //ARRANGE
            const req = {
                params: {id: '123fakeId'},
                body: {
                    categoria: 'test'
                }
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            //Stub di findByIdAndUpdate per simulare errore nel DB
            const error = new Error('DB failure');
            const updateStub = sinon.stub(Article, 'findByIdAndUpdate').rejects(new Error('DB failure'));

            //ACT
            await articleController.updateArticle(req, res);

            //ASSERT
            expect(updateStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWithMatch({message: 'DB failure'})).to.be.true;
        })
    })