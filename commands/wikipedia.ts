import { CommandInteraction, InteractionDataOptionsString } from "eris";
import wiki from "wikipedia";

const search = async (target: string, opLang: string) => {
    try {
       
        let lang = ""

        if(opLang){
            lang = opLang
        }
        
        await wiki.setLang(lang);
        console.time("WIKI TIME")
        const searchResults = await wiki.search(target, { suggestion: true, limit: 10 });
        console.timeEnd("WIKI TIME")


        if (!searchResults.results || searchResults.results.length === 0) {
            return 
            
        }

        const firstResultTitle = searchResults.results[0].title;
        const page = await wiki.page(firstResultTitle);
        
        const [title, response, url] = await Promise.all([
            page.title,
            page.summary(),
            page.fullurl
            
        ]);
        const text = response.extract;
        
        const thumbnailUrl = response.thumbnail?.source || '';        

        const result = { title, text, url, thumbnailUrl };
     
        return result;
    } catch (error) {
        console.error("Erro na busca Wikipedia:", error);
        throw error;
    }
};


module.exports = {
    name: "wiki",
    description: "Get information from Wikipedia",
    options: [
        {
            name: "term",
            description: "your research",
            type: 3,
            required: true
        },
        {
            name: "language",
            description: "type a language like pt, en, rs",
            type: 3,
            required: false,
            choices: [
                { name: '🇧🇷 Português', value: 'pt' },
                { name: '🇺🇸 English', value: 'en' },
                { name: '🇪🇸 Español', value: 'es' },
                { name: '🇫🇷 Français', value: 'fr' },
                { name: '🇮🇹 Italian', value: 'it' },
                { name: '🇩🇪 Deutsch', value: 'de' },
                { name: '🇯🇵 日本語', value: 'ja' },
                { name: '🇨🇳 中文', value: 'zh' }
            ]
        }
    ],
    execute: async (i: CommandInteraction) => {
        try {            
            await i.acknowledge();
            if (!i.data.options) return

            
            const searchTerm = i.data.options.find(opt => opt.name === 'term') as InteractionDataOptionsString | undefined;
            if (!searchTerm) return

            const langOp = i.data.options.find(opt => opt.name === 'language') as InteractionDataOptionsString | undefined
            
            let lang: string
            

            if (!langOp){lang = "pt";} else {lang = langOp.value}

            const page = await search(searchTerm.value, lang);
            
            if (!page){
                i.createMessage({
                    content: "It looks like you research was not found"
                    
                })
                return
            }
            const { title, text, url, thumbnailUrl } = page;
            
            
            i.createMessage({
                embeds: [{
                    title: title,
                    description: text,
                    url: url,
                    thumbnail: {
                        url: thumbnailUrl
                    }
                }]
            });
        } catch (error) {
            console.error("Error executing command wiki:", error);
            i.createMessage({
                content: "Hmm did you type it right? I couldn't find what you are looking for."
            });
        }
    }
};