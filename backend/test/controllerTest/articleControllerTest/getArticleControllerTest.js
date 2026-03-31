/* HTTP Status code da testare: 
1. getArticle:
1.1 HTTP status 200: Restituisce tutti gli articoli recuperato
1.2 HTTO status 200: Restituisce un array vuoto
1.2 HTTP status 500: Errore generico
2. getArticleById:
2.1 HTTP status 404: IdArticolo non trovato
2.2 HTTP status 200: Restituisce articolo
2.3 HTTP status 500: Errore generico */

const {expect} = require ('chai');
const sinon = require ('sinon');

//Importo productController contenente le funzioni che voglio testare
const articleController = require ('../../../controllers/articleController');
const Article = require ('../../../models/Article');

//Descrivo il gruppo di test relativo al controller
describe ('getArticle Controller', ()=> {
    
    //afterEach dopo ogni test ripulisce gli stub
    afterEach(()=> {
        sinon.restore();
    });
    
    // *** SCENARIO 1: SUCCESSO ***
    
    it('should return 200 and all articles when DB call succeeds', async () => {

        //ARRANGE
        const fakeArticle = [{
            categoria: "T-shirt",
            brand: "nike",
            stato:"Usato",
            _id: "123fakeArticleId"
        }];

        //Stub di Article. find
        const findStub = sinon.stub(Article, 'find').resolves(fakeArticle);

        //Creo req passata dal client con la query utente
        const req = {query: {} };

        //Creo una res con sinon.spy per controllare cosa viene inviato
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //ACT

        //chiamo il controller con i finti req / res
        await articleController.getArticle(req, res);
   

        // --- ASSERT ---

        //Verifico che Article.find() sia stata chiamata
        expect(findStub.calledOnce).to.be.true;

        //Verifico che ritorni (200) se restituisce gli articoli 
        expect(res.status.calledOnceWith(200)).to.be.true;

        //Verifico che torni un json con la lista degli articles
        expect(res.json.calledOnceWithMatch(fakeArticle)).to.be.true;
    });

    it('should return 200 and empty array when no articles are found', async ()=> {

        //ARRANGE
        const findStub = sinon.stub(Article, 'find').resolves([]);

        const req = {query: {} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };
        //ACT
        await articleController.getArticle(req, res);

        //ASSERT
        expect(findStub.calledOnce).to.be.true;
        expect(res.status.calledOnceWith(200)).to.be.true;
        expect(res.json.calledOnceWithMatch([])).to.be.true;
    });

    //*** SCENARIO 2: FALLISCE ***

    it('should return 404 when article is not found', async()=> {

        //ARRANGE

        //simulo che il DB non trovi l'articolo ricercato
        const findByIdStub = sinon.stub(Article, 'findById').resolves(null);

        //Creo req con params.id (qualsiasi id non esistente)
        const req = {
            params: {id: 'nonexistent-id'}
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //ACT
        await articleController.getArticleById(req,res);

        //ASSERT
        //Controllo che findById sia stato chiamato con l'ID corretto
        expect (findByIdStub.calledOnceWith('nonexistent-id')).to.be.true;

        //controllo che lo status sia 404
        expect(res.status.calledOnceWith(404)).to.be.true;

        //Controllo che il json restituisca il messaggio corretto
        expect(res.json.calledOnceWithMatch({message: 'ID Articolo non trovato'})).to.be.true;
    });

    it('should return 500 if database throw error', async () => {

        //ARRANGE
        const findStub = sinon.stub(Article, 'findById').rejects( new Error("DB failure"));

        const req = { params: {id: 'any-id'} };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //ACT
        await articleController.getArticleById(req, res);

        //ASSERT
        expect(findStub.calledOnce).to.be.true;
        expect(res.status.calledOnceWith(500)).to.be.true;
        expect(res.json.calledWithMatch({message: "DB failure"})).to.be.true;
    });
});