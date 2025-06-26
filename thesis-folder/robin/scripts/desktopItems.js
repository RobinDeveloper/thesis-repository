// Defines all desktop items (documents, programs, launchers)

// Ensure window.utils and window.programs exist before using them
// This relies on the loading order in index.html
if (typeof window.utils === 'undefined') {
    window.utils = {}; // Provide a basic fallback if utils.js isn't loaded yet (though it should be)
}
if (typeof window.programs === 'undefined') {
    window.programs = {}; // Provide a basic fallback if programs aren't loaded yet
}

const desktopItems = [
    {
        type: "document",
        title: "Poetic Potential",
        content: window.utils.formatDocumentContent(`
            <h1>Poetic Potential</h1>
            <p>Poetry is often described as the language of emotion, characterized by its ability to condense meaning, and for creating rhythm in structured form. Poets adhere to constraints when writing haikus, and sonnets, the Oulipo literary group a gathering of mostly french-speaking writers and mathematicians who experimented with other self-imposed constraints.</p>
            <p>If poetry is fundamentally about form, rhythm, feeling, and interpretation, could programming evoke poetic ideas and feelings?</p>
            <h2>Robin Opheij</h2>
            <p>Like natural language, programming has rules. The need in programming for human-readable text over machine code draws inspiration from Indo-European language development in structure and syntax. Programming has been a Western culture rooted development, and thus the way we program will come from these cultures; this is being challenged within the field of Esoteric Programming Languages (esolangs).</p>
            <p>Code can exhibit forms of conciseness like minimalist poems and written with self-imposed or computer-forced constraints. Programs can generate infinite results or endless streams of predefined structured text, even used in procedural poetry. Monostich-like single lines of code creating landscapes of new forms behind it. Code like poetry is culturally significant and has an impact on the community that formed around it.</p>
            <p>Austrian philosopher and logician Ludwig Wittgenstein argues that language derives from its use, and not its inherent value of words itself. In code and programming, we can have the argument that code has either beautiful textual qualities or that it needs to be executed to complete itself and make it truly something poetic. English mathematician Ada Lovelace [1], often considered the first computer programmer, viewed her work as a "poetic science," a practice where logic, creativity, and imagination merge together. I hope to argue that this is the case for programming as well, with code invoking logic, creativity, and imagination in the programmer when they are working on their craft, and thus making code and programming at least a poetic science.</p>
            <p>Modern theorists like Canadian media professor Wendy Hui Kyong Chun, and American poet and digital media professor Nick Montfort suggest that code should be read as a cultural text, same as we do with any other literature. When we read code as a literary text, maybe we can find an elegance otherwise overlooked, not one that is focused on a technical quality, but one that is based in human expression, looking at code from an aesthetic dimension and to look for a feeling or soul in just the textuality of code.</p>

            <p class="section-title">References</p>
            1. Betty A. Toole, Ada, the Enchantress of Numbers. Strawberry Press, 1992. https://openlibrary.org/books/OL22619654M/Ada_the_enchantress_of_numbers, pp.134
            2. Another Example Reference. Some Publisher, 2020.
        `)
    },
    {
        type: "document",
        title: "Minimalism and Conciseness",
        content: window.utils.formatDocumentContent(`
            <h1>Minimalism and Conciseness</h1>
            <p>Minimalism in programming is often found in conciseness and efficiency; a simple elegance in its ingenuity. The UNIX philosophy emphasizes doing one thing well, and this thing being simple, compact, clear, and extensible code. This idea also extends to programming languages like LISP where every element is meaningful and needed. The pursuit of efficiency and clarity often leads to code that not only serves some utilitarian function but carries something beautiful, much like a well-crafted poem; the programmer's challenge is to convey or computationally express complex problems or ideas within a limited space. Rather than blocking a creative act, these restraints help the programmer be more decisive in their writing.</p>
            <p>The single line of BASIC code <code>10 PRINT CHR$(205.5+RND(1)); GOTO 10;</code> shows how minimal code can be whilst generating a vast landscape of an infinite maze.</p>
            <p>This piece of code when ran on the game computer Commodore 64 would use two very simple characters, the forward-slash and backward-slash, to create unique structures on the screen. Every new execution would lead to a new, completely unique maze to be created. The monostich one-liner with unpredictable variations had Montfort et. al. do a close reading on this line due to its ability to be simple enough to easily explain each aspect, and perfect for explaining their views on how we should interact with code from the perspective of Platform Studies and Software Studies. In "10 PRINT CHR$(205.5+RND(1)); GOTO 10;" Montfort and his colleagues do such a close reading, talking about how when code is treated as a text we can discover other qualities about it, what it has done to culture, or how it existed and was created by culture. The book talks about whilst the one-liner is a historically located object to study, it's not unique or even rare for that matter. It was simply included with each device sold, making it a commonplace text. Yet it resonates with people in the demoscene community, scholars, the hobbyist of the time, and thus even a book.</p>
            <p class="section-title">References</p>
            1. Nick Montfort, et al. 10 PRINT CHR$(205.5+RND(1)); GOTO 10. MIT Press, 2012.
        `)
    },
    {
        type: "document",
        title: "Context and Interpretation",
        content: window.utils.formatDocumentContent(`
            <h1>Context and Interpretation</h1>
            <p>Lovelace's concept of poetical science suggests that programming is not purely utilitarian, but a creative interpretive act where mathematics are used not only to solve complex problems, but to explain concepts hard to be found by language. Lovelace saw science as an expressive medium, not rigid in its ways, a perspective reiterated in the academic subfield of software studies today. Montfort's work on platform poetics in "Platform Studies" explores how code's meaning will shift depending on the hardware it's exposed to or even other software it will interact with or is built upon, or even its own execution. He argues that code is not something self-contained; it is embedded in a certain technological and cultural environment. Code is more than a set of instructions; it's a performative text that performs what it is asked to do but does so by interacting with everything in its environment and does show because of the instructions set by the culture of the creator. Montfort's idea of "platform" is thus not only about technical infrastructure, but the ideas, morals, fundamentals, and cultural context in which it's created. Much like poetry, which is very different based on the culture of the poet, school of thought, and personal quips. Chun deepens this thought process in "Programmed Visions" where she also writes about how not only how we affect code and how software not only shapes how we interact with technology but how we interact with the entire world around us. Adding also how we can learn to understand such a technologically advanced and imbued world. Chun also engages with the ideas of how/and when algorithms are used to construct an identity in our digital age in "Algorithmic Authenticity". Opening the discussion of how code has a potential poetic experience. Her argument in the book dives into how computational processes operate more as a performance of meaning than as a transparent execution of it. Like poetry where meaning is never a fixed idea, in programming. Code when viewed through this lens is not something that purely executes but like in poetry and computer-based or programmatically created art the form comes out of not something immediately visible or literal, but invites us to look into a deeper contextual interpretation. Chun's critique is showing us code is not an antithetical of poetics but an extension of it.</p>
            <p>Esoteric programming languages (esolangs) like Brainfuck or Malbolge push this idea of context and interpretation to its extreme, by even questioning the readability of code to even the usability of it. Making the writing in an esolang an already poetic act where code is both an object and event. Languages like these have limited syntax, that are juxtaposed to "readable" programming languages, making programming in these languages almost as hard as writing straight machine code, doable or small examples but hard to near impossible for larger structures. Just as how large scale poetic works are almost unheard of outside of the ancient Epic's, tragedies, and comedies.</p>
            <p class="section-title">References</p>
            1. Wendy Hui Kyong Chun. "Programmed Visions: Software and Memory." Choice Reviews Online, vol. 49, no. 05, 2012.
        `)
    },
    {
        type: "document",
        title: "The Poetics of Code",
        content: window.utils.formatDocumentContent(`
            <h1>The Poetics of Code</h1>
            <p>This exploration that tried to explain the ways that code is a poetic medium over its more utilitarian execution-based use-case has shown that there is a playfulness in the textual aesthetics, processes, and cultural context of code. Exemplifying code as an expressive medium right for poetic expressions.</p>
            <p>Programming is a poetic science with its own rules and constraints, opening up the possibilities for creativity and imagination. The programmer is forced to think more elegantly by these constraints as we could find in the examples of FISR and 10 PRINT, small, concise, elegant, and rooted in creativity. 10 PRINT even being rewritten with many different variations exploring this simple algorithm in further depth.</p>
            <p>Code should not only be executed, but read, in close reading form as is done with literature to reveal inherent biases, beauties, and cultural impregnations of the time and place of the author. Like poetry is a sign of its time, the culture and ideas of their author, emotions, and feelings, so is code an exploration in what is valued and what is perceived at the time of creation.</p>
            <p>To write code is to interact with it with the methodology of a poetic science; it's not just a science or just designing a rule set but a play with creativity and imagination in the forefront. To write code is to interact with it in time and society, execution, and errors, further influencing the former and the former influencing the latter.</p>
            <p class="section-title">References</p>
            1. Mark C. Marino. Critical Code Studies. MIT Press, 2020.
            2. Daniel Holden and Chris Kerr. Code Poetry.
        `)
    },
    {
        type: "program",
        title: "10 PRINT",
        // Safely reference the program function, assuming it's loaded onto window.programs
        run: typeof window.programs.tenPrintRun === 'function' ? window.programs.tenPrintRun : () => console.error("10 PRINT program not loaded.")
    },
    {
        type: "program",
        title: "Cubic Limit",
        // Safely reference the program function, assuming it's loaded onto window.programs
        run: typeof window.programs.cubicLimitRun === 'function' ? window.programs.cubicLimitRun : () => console.error("Cubic Limit program not loaded.")
    },
    {
        type: "program",
        title: "Battle Chess",
        // Safely reference the program function, assuming it's loaded onto window.programs
        run: typeof window.programs.battleChessRun === 'function' ? window.programs.battleChessRun : () => console.error("Battle Chess program not loaded.")
    },
    {
        type: "launcher",
        title: "Library of Babel",
        url: "https://libraryofbabel.info/",
        iconText: "📚" // Book emoji for library
    }
];

// Expose desktopItems to the global scope under window.desktopItems
window.desktopItems = desktopItems;

