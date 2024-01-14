const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const EtapaInicial = addKeyword(['inicial', 'inicio', 'recien', 'crear']).addAnswer(
    [
        '*1.Ten una idea de negocio viable.* ¿Qué quieres ofrecer a los demás? ¿Cuál es tu propuesta de valor? Asegúrate de que tu idea tenga potencial de ser rentable y de satisfacer una necesidad o deseo real',
        '\n*2.* Elabora un plan de negocios.* Este documento te ayudará a definir los objetivos de tu negocio, a analizar el mercado, a desarrollar una estrategia de marketing y ventas, y a establecer un plan financiero',
        '\n*3.* Desarrolla las habilidades y experiencia necesarias para llevar a cabo tu negocio.* ¿Qué conocimientos y habilidades necesitas para desarrollar tu idea? ¿Tienes la experiencia necesaria para gestionar un negocio? Si no es así, busca cursos, talleres o mentores que te ayuden a desarrollarlas',
        '\n 4.*Consigue el capital necesario para iniciar tu negocio.* ¿Cuánto dinero necesitas para cubrir los gastos iniciales? ¿Tienes ahorros o puedes conseguir financiamiento?',
        '\n *5. Sé motivado y perseverante.* El emprendimiento es un camino lleno de desafíos, pero también de recompensas. No te rindas ante las dificultades.',
        'Si quieres unos consejos adicional escribe *consejos* '
    ],
    null,
    null,
    [consejos]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const consejos = addKeyword(['consejo']).addAnswer(
    [
        '*Investiga el mercado antes de iniciar tu negocio*. Esto te ayudará a asegurarte de que tu idea es viable y de que hay una demanda para tus productos o servicios.',
        '[*Conoce a tu público objetivo*] Quiénes son las personas a las que quieres vender? ¿Cuáles son sus necesidades y deseos?',
        '[*Desarrolla una estrategia de marketing y ventas eficaz*] Asegúrate de que tus productos o servicios lleguen a las personas adecuadas.',
        '[*Gestiona tu negocio de forma eficiente*] Es importante llevar un control de los gastos y de los ingresos para evitar pérdidas.',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola, ¿en qué puedo ayudarte?')
    .addAnswer(
        [
            'Soy un chatbot diseñado para poder ayudarte en tu etapa de emprendimiento',
            'si deseas conocer los puntos basicos para emprender escribe *inicio*',
        
            
        ],
        null,
        null,
        [EtapaInicial]
    )

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
