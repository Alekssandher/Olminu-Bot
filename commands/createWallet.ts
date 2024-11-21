
import { CommandInteraction } from 'eris';
const wallet = require('../scripts/createWallet')

interface Wallet {
    address: string;
    privateKey: string;
    seed: string;
}

async function gerarCarteira(): Promise<Wallet | null> {
    try {
        const carteira: Wallet = wallet
        console.log("Carteira gerada")
        return carteira;
    } catch (error) {
        console.error("Erro ao gerar a carteira:", error);
        return null;
    }
}
module.exports = {
    name: "create-wallet",
    description: "Generate a bitcoin wallet",
    execute: async (i: CommandInteraction) => {
        try {
            
            console.time("WALLET TIMER")
            const wallet: Wallet | null = await gerarCarteira();
            console.timeEnd("WALLET TIMER")

            if (!wallet) return i.createMessage("Erro ao gerar carteira, tente novamente.")

            console.log("Carteira recebida");

            if (wallet) {
                console.log("Enviando carteira para o usuário...");
                i.createMessage({
                    content: `Aqui está a sua carteira bitcoin\nAddress: ${wallet.address}\nPrivate key: ${wallet.privateKey}\nSeed: ${wallet.seed}`,
                    flags: 64  
                });
                console.log("Carteira enviada!")
            } else {
                console.error("Erro: Carteira não gerada.");
                i.createMessage({
                    content: "Houve um erro ao gerar a carteira. Tente novamente mais tarde.",
                    flags: 64  
                });
            }
        } catch (error) {
            console.error("Erro ao processar o comando:", error);
            i.createMessage({
                content: "Houve um erro ao processar o comando. Tente novamente.",
                flags: 64
            });
        }
    }
};