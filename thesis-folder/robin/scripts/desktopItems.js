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
           <h1 id="-poetic-potential">—————— Poetic Potential</h1>
<p>Poetry is often described as the language of emotion, characterized by its ability to condense meaning, and for creating rhythm in structured form. Poets adhere to constraints when writing haikus, and sonnets or even more intently the Oulipo literary group a gathering of mostly French-speaking writers and mathematicians also experimented with constraints, in doing so they show a way of writing often found within programming where constraints are required not only by aesthetic reasons, but also computational once.</p>
<p>Like natural language, programming has rules. The need in programming for human-readable text over machine code draws inspiration from indo-european language development in structure and syntax. Programming had been a western culture rooted development and thus the way we program will come from these cultures. However, this is being challenged within the field of Esoteric Programming Languages (esolangs).</p>
<p>Code can exhibit forms of conciseness like minimalist poems and written with self-imposed or computer forced constraints. Programs can generate inifinite results or endless streams of pre-defined structured text even used in procedual poetry. Monostich-like single lines of code creating landscapes of new forms behind it. Code like poetry is culturally significant and has an impact on the community that formed around it.</p>
<p>Austrian philosopher and logician Ludwig Wittgenstein argues that language derives from its use, and not its inherent value of words itself. In code and programming, we can have the argument that code has either beautiful textual qualities or that it needs to be executed to complete itself and make it truely something poetic. English mathmatician Ada Lovelace, often considered the first computer programmer, viewed her work as a &quot;poetic science&quot;[1],  a practice where logic, creativity, and imagination merge togheter. I hope to argue that this is the case for programming as well with code invoking logic, creativity, and imagination in the programmer when they are working on their craft, and thus making code, and programming at least a poetic science.</p>
<p>Modern theorists like Canadian media professor Wendy Hui Kyong Chun, and American poet and digital media professor Nick Montfort suggest that code should be read as a cultural text, same as we do with any other piece of literature. When we read code as a literary text maybe we can find an elegance otherwise overlooked, not one that is focussed on a technical quality, but one that is based on human expression, looking at code from a aesthetic dimension and to look for a feeling or soul in the textuality of code.</p>
<p>Leading to my main research question: If poetry is fundamentally about form, rhythm, feeling, and interpretation, could code also evoke poetic ideas and feelings?</p>


            <p class="section-title">References</p>
            1. Betty A. Toole, Ada, the Enchantress of Numbers. Strawberry Press, 1992. https://openlibrary.org/books/OL22619654M/Ada_the_enchantress_of_numbers, pp.134
        `)
    },
    {
        type: "document",
        title: "Minimalism and Conciseness",
        content: window.utils.formatDocumentContent(`
            <h1 id="-minimalism-and-conciseness">—————— Minimalism and Conciseness</h1>
<p> Minimalism in programming is often found in conciseness, and efficiency, a simple elegance in its inginuity. The UNIX philosophy emphasizes doing one thing well, and this thing being simple, compact, clear, and extensible code. This idea also extends to programming languages like LISP where every element is meaningul and needed. The pursuit of efficiency and clarity often leads to code that not only serves some utilitarian function but carries something beautiful. Much like a well-crafted poem, the programmer’s challenge is to convey or computationally express complex problems or ideas within a limited space. Rather than blocking a creative act, these restraints help the programmer be more decisive in their writing.</p>
<p>The single line of BASIC code 10 PRINT CHR$(205.5+RND(1)); GOTO 10; shows how minimal code can be whilst generating a vast landscape of an infinite maze.</p>
<p>This piece of code, when ran on the game computer Commadore 64, would use two very simple characters – the forward-slash and backward-slash – to create unique structures on the screen. Every new execution would lead to a new completely unique maze to be created. The monostich one liner with unpredictable variations had Montfort et. al. do a close reading on this line due to its ability to be simple enough to easily explain each aspect, and perfect for explaining their views on how we should interact with code from the perspective of Platform Studies and Software Studies. In &quot;10 PRINT CHR$(205.5+RND(1)); GOTO 10;&quot;[1] Montfort and his colleagues do such a close reading, talking about how when code is treated as a text we can discover other qualities about it, what it has done to culture, or how it existed and was created by culture. The book talks about whilst the one-liner is a historically located object to study, it’s not unique or even rare for that matter. It was simply included with each device sold making it a commonplace text. Yet it resonates with people: in the demo-scene community, scholars, the hobbyist of the time, and thus even a book.</p>
<p>Casey Reas, American artist and alma mater of the University of Cincinnati Massachusetts Institute of Technology, and Dutch-Belgian artist duo JODI explore these minimal, rule-based expressions in code and art. Reas’ work involves making generative systems that trough simplicity create great imagery, providing another look into how simple ideas can make creative results, creating a form of poetic dance between the programmer and compiler to create something with as little as possible. JODI quite the contrary plays with the missuse of code to create deliberate chaotic outputs, akin to a form of data Dadaism, questioning what the digital realm is and how we interact with these structures. With works like their atomic bomb, purposefully hiding the entire work in its source code, creating a textual feast for the unseen eye. This work forces us to look at what is mostly thought of as the purely utilitarian text of a website (its source code) but then has us thinking about it, and what it means to us. It is layered and subjective, much like poetry. It is something that has to be read and examined before it is understood or felt.</p>
<p>In algorithmic poetry, a few lines of well-crafted rules/code can perform a vast and unique structure of new sentences, which are in turn poetry. The haiku, a rule-based poetry form that forces us to think about the written lines because of its conciseness and need for direct yet vague language has the ability to create imagery in our minds just the same. In code, constraints can exist in the form of a lack in memory or processing power, making the programmer more creative in their poetic science. The Fast Inverse Square Root (FISR) algorithm is a good example of this.</p>
<p>The FISR algorithm, first found in the source code of Quake III Arena, is a function/algorithms that is elegant in its condenseness. It is a creative trick which saves many computationally heavy executions from happening, providing the developers with the ability to make (for its time) realistic 3D games at an acceptable FPS (Frames Per Second), yet maintaining the accuracy those heavy computations would yield. American computer scientists Chris Lomont and Charles McEniry provided another detailed analysis in this function, specifically its beauty. They uncovered how it used smart bitwise operations on floating-point numbers transplaced as long with a &quot;magic number&quot;[2]  (0x5f3759df). What is also often mentioned and even debated online is its inclusion of another programmer adding the commen &quot;what the fuck&quot;  – a glimpse of humanity in this technical and precise function, showing us that even colleagues of the creators were baffled by this technique. The debate usually existed around the question if the crude comment should be included. I believe it should, because it adds just that touch of real people writing and interacting with this. The FISR algorithm truly encompasses the idea of &quot;poetic science&quot; in use and why programming is part of it or even exists completely within it. Merging both creativity, imagination, and logic together to create such a neat, condensed, and efficient piece of code that to computer programmers looks so beautiful (and I hope to you too). [3]</p>



	    <p class="section-title">References</p>
            1. Nick Montfort, et al. 10 PRINT CHR$(205.5+RND(1)); GOTO 10. MIT Press, 2012.
	    2. Predefined values built into the computer, common in computer science literature.
	    3. The first found use of this function, or almost the FISR function was in the comments of a fdlib library file where 2 computer scientists mention an unpublished paper with this algorithm as main topic.
        `)
    },
    {
        type: "document",
        title: "Context and Interpretation",
        content: window.utils.formatDocumentContent(`
           <h1 id="-context-and-interpretation">—————— Context and Interpretation</h1>
<p>Lovelace’s concept of poetical science suggests that programming is not purely utilitarian, but a creative interperative act where mathmatics are used not only to solve complex problems, but to explain concepts hard to be found by language. Lovelace saw science as an expressive medium, not rigid in its ways, a perspective reiterated in the academic subfield of software studies today. Montfort’s work on platform poetics in &quot;Platform Studies&quot; explores how code’s meaning will shift depending on the hardware it’s exposed to or even other software it will interact with or is built upon, or even its own execution. He argues that code is not something self-contained, but embedded in a certain technilogical and cultural enviroment. Code is more than a set of instructions, it’s a performative text that performs what it is asked to do but does so by interacting with everything in its environment and does so because of the instructions set by the culture of the creator. Montfort’s idea of &quot;platform&quot; is thus not only about technical infrastructure, but the ideas, morals, fundementals, and cultural context in which its created. Much like poetry which is very different based on the culture of the poet, school of thought, and personal quibs. [1]</p>
<p>Chun deepens this thought process in Programmed visions where she also writes about not only how we affect code and how software not only shapes how we interact with technology but how we interact with the entire world around us. Adding also how we can learn to understand such a technologically advanced and imbued world.[2] </p>
<p>Chun also engages with the ideas of how and when algorithms are used to construct an identity in our digital age in &quot;Algorithmic Authenticity&quot;, opening the discussion of how code has a potential poetic experience. Her argument in the book dives into how computational processes operate more as a performance of meaning than as a transparent execution of it. Like poetry where meaning is never a fixed idea, in programming. Code when viewed through this lens is not something that purely executes but like in poetry and computer-based or programmically created art, the form comes out of not something immediately visible or literal, but invites us to look into a deeper contextual interpretation. Chun’s critique is showing us code is not an antithetical of poetics but an extension of it.</p>
<p>Esoteric programming languages (esolangs) like Brainfuck or Malbolge push this idea of context and interpretation to its extreme, by questioning the readability of code to even the useability of it. Thus, the writing in an esolang becomes an already poetic act where code is both an object and event. Languages like these have limited syntax, which are juxtaposed to &quot;readable&quot;  programming languages, making programming in these languages as hard as writing straight machine code, doable or small examples but hard to near impossible for larger structures. Just as how large-scale poetic works are almost unheard of outside of the ancient Epic’s, tragedies, and comedies.</p>
<p>By applying Wittgenstein’s ideas of &quot;language games&quot;  to programming languages, we find how they create meaning trough context. Poetic forms that impose constraints on the poet lead to different forms of creative expression. Different languages have different areas they excell or fail at and thus create their own context of writing for these applications. Meaning of code doesn’t have to lie only with their textual qualities, but also with how, when, and where it’s executed. &quot;Code runs,” Montfort writes. “Code does something. Code executes on the computer and has operational semantics. But code means things to people as well, both implicitly and explicitly&quot; . Exemplifying Wittgenstein’s idea that the meaning of a word is in its use in the language, or, for code, the meaning in the code is in the execution of its processes. </p>


	    <p class="section-title">References</p>
            1. Nick Montfort "Platform Studies." In 10 PRINT CHR$(205.5+RND(1)); : GOTO 10, Nick Montfort, Patsy Baudoin, John Bell, Ian Bogost, Jeremy Douglass, Mark C. Marino, Michael Mateas, Casey Reas, Mark Sample, and Noah Vawter, pp.6–7, Cambridge, MA: MIT Press, 2013
	    2.Wendy Hui Kyong Chun, Programmed Visions: Software and Memory (Cambridge, MA: MIT Press, 2011), pp. 9–10.
        `)
    },
    {
        type: "document",
        title: "Language Games",
        content: window.utils.formatDocumentContent(`
	    <h1 id="-language-games">—————— Language Games</h1>
<p>Wittgenstein’s &quot;Philosophical Investigations&quot; introduces the idea that meaning in language derives from the context in which it is found. He argued that words do not have inherent meaning, they acquire meaning through their role in various &quot;language games&quot;. These afformentioned games are more rule-based activities that language is used in to achieve their purpose. Programming likewise has meaning emerge from how it interacts with its &quot;platform&quot;, be that computer, OS, or human interpreter. The act of programming becoming a process of participation in forms of language games that programmers play by manipulating syntax and structure according to a ruleset that will achieve a better rhythmic solution be that to read the code or how it is executed.</p>
<p>Live-coding is a practice that has programmers write in a truely performative matter. It is the act of writing code for music or visuals live in front of an audience. This live audio-visual programming performance is a direct example of a language game within the field of computer-generated art.</p>
<p>In the Algorave movement code is used as the tool for expression and setting for their performance. In TidalCycles, for example, code is used to generate audio patterns, and sound. Where the act of writing and editing code not only to make a final product, but as the process of creation an expierence, blurring the lines of what programming is, more so, positioning itself as the instrument and composer. This “liveness”, as Hong Kong-born artist, coder, and researcher Winnie Soon would call it, is crucial: code is not something static, but dynamic evolving in time. Soon explores this idea in &quot;Executing Liveness: an examination of the live dimensions of code inter-actions in software (art) practice&quot;. &quot;Liveness&quot; in the sense that there is more than real-time execution to the activity of code[1].  It’s about a shared responsiveness and presence to the programmer, code, and &quot;audience&quot[2];  in the sense of live coding, but user for standalone software. Programming thus is an embodiment of creative thinking, and entangled with human gestures or processes, errors, and improvisations.</p>
<p>In Code Poetry, like those of the perl poetry contest or the book Code Poetry by programmer and writer Daniel Holden and poet Chris Kerr showcasing how structures of code can be used as an aesthetic, much like concrete poetry where the literary matters as much as the way it’s displayed.[3]</p>
<p>These functional pieces of code are written in such a way that they also say something about it what is its execution, referencing both an aesthetic quality of text and how it can be used to create form, but also about the recursive loops found in programming. The reading or interpretation does not come from a strict form but from the observer’s cultural context.</p>
<p>Esolangs also play with these language games, they are made for non-practical use. Esolangs exist to explore the boundaries in computer science; challenging conventional notions of what a programming language is supposed to be. Take for instance Whitespace, a language designed to be programmed with only whitespace characters like SPACE, RETURN, AND TABS. This brings what we normally overlook to the foreground yet keeping it secret also to the eye. Whitespace prioritizes conceptual and aesthetic poetic writing over any readbility and useablity. Another thing that makes Whitespace so interesting is that because it is a langauge that is written using only whitespaces, it can be written inside code of languages that ignore said whitespace. Making that text a polyglot adding another layer of expression within functionality.</p>

    
            <p class="section-title">References</p>
            1. Winnie Soon, Executing Liveness: An Examination of the Live Dimension of Code Inter-actions in Software (Art) Practice (PhD diss., Aarhus University, 2016), Chapter 1.3, pp. 26–43.
	    2.  Audience in the sense ranging from live performance audience to a more individual observer.
	    3.  Daniel Holden, Chris Kerr, CodePoetry, April 5, 2025, https://code-poetry.com/home
	`)
    },
    {
	type: "document",
        title: "Complexity in Simplicity",
        content: window.utils.formatDocumentContent(`
		<h1 id="-complexity-in-simplicity">—————— Complexity in Simplicity</h1>
<p>The algorithmic art of German artist Manfred Mohr like the Cubic Limit series shows the rule-based plotting of simple geometric shapes, yet requiring a complex computer Fortran V. Cubic Limit was a series of studies in algorithmic design, creating works with the simple requirement of showing lines plotted in different matters, all revolving around cubes, cubic formulas, and lines. Other interesting experiments were for instance Visual Equations which was computer generated plotter image with different line structures that were put into an array, then equeling their final structure. Mohr’s work, which involves the manipulation of geometric shapes, changes the artist’s role from a creator of detail to the designer of systems which in turn will generate new endless streams of imagery. This way of working is remarkably similar to the field of generative literature and procedural poetry. Creating a form of poetics within the dance of code, computer, and author.</p>
<p>Argentine writer Jorge Luis Borges wrote his short story &quot;The Library of Babel&quot; about a library where all possible versions of any 410-page book has been written/generated/exists. While the library contains all answers to the universe, or how it ends, how to cure any disease, the vast majority of the books will either be filled with noise, random sets of letters that have no relation to each other. And even if the text is legible who can tell the truth from the lies? Whilst fictional, this short story relates heavily to computer science and generative systems asking the question if all that is generated is not just noise until curated by a person or is there already inherent quality in this generated &quot;noise&quot;[1] ? If we look at this idea and relate it to for instance 10 PRINT which produces an endless and unique maze with every execution, which has inherent aesthetic qualities even if it is just noise, we could argue that that is us finding meaning in the aesthetics, thus the same as finding meaning in the books that are coherent in the Library of Babel just with a lower threshold of what it means to be &quot;of quality&quot;.</p>


	<p class="section-title">References</p>
        1.   In computer science noise refers to data that is unwanted, or unknown.
	    `)
    },
     {
	type: "document",
        title: "Writing as a Poetic Act",
        content: window.utils.formatDocumentContent(`
		<h1 id="-writing-as-a-poetic-act">—————— Writing as a Poetic Act</h1>
<p>In Critical Code Studies American writer and scholar Mark C. Marino argues that code should be analyzed as more than functional software, but as cultural writing. The field of critical code studies is an interdisciplinary field that examines the social, cultural, and political dimensions of code, arguing that code is not neutral, in the sense that it’s been written by people, shaped by institutions, used in social systems, and filled with cultural meaning[1].  Code for login systems that assume gender binaries isn’t a technical decision but one rooted in their author’s worldview. Any written code is by design, not given by the code itself, revealing a form of unnaturalness. We can also find this inside programming languages themselves, where some are made for finance and others are more focused on data. Code is not something passive. It governs how people live as a regolatory force decided by design but not executed in perfect unity with all that is well. Take for instance redlining (a financial discrimination against residents of certain areas). To fully understand this topic, it might be useful to do close reading of a bank’s code and see how they decide on approving or disaproving mortgages, not simply the end result of these systems. When code is written, the programmer (un)consciously embed’ their worldview and ideas into the code itself, the different programming languages shaping the way code operates much like different poetic forms, with their own rhythm and form. When close reading such programs source code we reveal these subtle indicators of their authors, same as we would do with poets.</p>
<p>Writing code like writing poetry requires a form of rhythm, clear choices and aesthetic decisions. Programmers have to decide on naming conventions, structure, code style, and a dance of how the execution should run, all having their impact on readability and maintainability, form and aesthetics, and efficiency.</p>
<p>Live coding performances align with this idea of code being something cultural and expressive. By performing live programming becomes not just the underlying tool but part of its architecture. The normally hidden black box like code is being forced into the forground as an aesthetic, and social part of a performance artwork, exploring the liveness of code more directly.</p>
<p>In &quot;Executing Liveness&quot; Soon discussed how code operates dynamically. She does this by looking at the execution of software and the underlying code. By highlighting code as not just something written by a programmer, just a set of instructions, but something that is shaped by the process of both execution and the input set[2].  Both Marino and Soon ask the question &quot;what does it mean to run code?&quot; where Marino asks about the context of who and what is ran, and Soon focusses more on how it is executed plus how that positions itself comparatively to the text.</p>
<p>Programming as a poetic act is to write code to confront a power be that governing, or social, a system that takes ownership of a concept.</p>
<p>French Algerian philosopher Albert Camus in his speech &quot;Create Dangerously&quot; talked about what it means to make art in times of crisis. This is not unlike what a programmer should and could be thinking of, using code as a protest tool has been done many times, or the other way around, code has been censored for being a weapon of war. Such is the case for Pretty Good Privacy (PGP). When this software was first written it was being shared online until the US government ended that, saying that it fell under international arms dealing and being a theat to national security. So, the developer of PGP released the source code as book form which was defended under the free speech act allowing the program to be sent worldwide. To create dangerously is to reveal, not obscure; to break; or to invite. Camus believed that art must confront power[3],  and to write code as a poetic act I believe that one should write code to confront, and critique said powers. Code should be used to break societal norms, not just reinforce them by being complacent with what is expected. We have been given infinite possibilities we should explore.</p>

	<p class="section-title">References</p>
        1. Mark C. Marino, Critical Code Studies,(MIT. Press), Critical Code Studies, a Manifesto, pp.37-54
	2. Soon, Executing Liveness, pp.268
	3. Albert Camus, Create Dangerously,translator Justin O’Brien (Pinguin Modern classics), pp.1-39
    `)
    },
     {
	type: "document",
        title: "Rythm and Movement in Code",
        content: window.utils.formatDocumentContent(`
		<h1 id="-rhythm-and-movement-in-code">—————— Rhythm and Movement in Code</h1>
<p>As we have discussed before, code is not something static or rigid, rather something dynamic and moving. Trough execution, thorough reading, and the act of writing. Code is like a musical score. In algorithmic music composition we can hear the code’s aesthetic, repetitve recursion, and structured states. When we use the computer, program, or compiler as a co-performer, the code becomes alive or has this liveness, it is transformed into a time-based medium. The poetics of a well performed improvised jazz concert is not too unfamiliar to a generative music composition. This is not everything though. British author and theorist Geoff Cox writes in Aesthetic Programming A Handbook of Software Studies that it’s not just in the liveness of code, but also the act of writing code itself brings rhythm and movement. When writing code, waiting for compilation, rinse and repeat is bound into the program itself and affecting how it is executed in the end by the pauses changing the author’s mind and &quot;flow&quot;.  Flow is a term coined by Mihaly Csikszentmihalyi who explains it as an all-encompassing feeling of being “in the zone” fully absorbed by the activity at hand.  When a skilled programmer is programming, the only thing that will take him out of said zone when and if achieved is the waiting period between input and result. If an error occurs, the zone is destroyed but can still leave a poetic beauty otherwise not found by being pushed out of the zone. In this way the programmer can find something new and interesting that was before unseen. Programming is a more time-based practice akin to dance or music.</p>
<p>Glitch art, and error disruption, brings up the topic of movement in code or more the lack thereof. When a glitch happens, the code abruptly breaks, stops in its execution, and opens up the black box revealing what is inside. Dutch art theorist Rosa Menkman in The Glitch Moment(um) brought up her concept of resolution disruption. Resolution not in the term of image pixel count but expanding the term to include rules, and exceptions. This is how we shape our media, encode it, transmit it, and decode it. The disruption is when this idea fails, artifacts arise and cracks form. It’s a poetic display of decay, and rhyhtm. The absence of motion in the form of crashes or errors that create unimagined results holds a tension to the execution that can lead to new meaning, maybe even more profound than what is meant or expected.</p>
<p>The poetics of code is not just the syntax, or structure, the liveness, or dynamics – it’s all of it combined and yet all of it on its own. There is a tempo, code moves across time and systems, and rewires the mind opening up new ways of thinking about the world, art, literature, and poetry. Becoming its own form of poetry itself.</p>



	<p class="section-title">References</p>
        1.   In computer science noise refers to data that is unwanted, or unknown.
	    `)
    },
    {
	type: "document",
	title: "The Poetics Of Code",
	content: window.utils.formatDocumentContent(`
	    <h1 id="-the-poetics-of-code">—————— The Poetics of Code</h1>
<p>This exploration that tried to explain the ways that code is a poetic medium over its more utilitarian execution based use-case has shown that there is a playfullness in the textual aesthetics, processes, and cultural context of code. Exemplifying code as an expressive medium right for poetic expressions.</p>
<p>Programming is a poetic science with its own rules and constraints, opening up the possibilities for creativity and imagination. The programmer is forced to think more elegantly by these constraints as we could find in the examples of FISR and 10 PRINT, small, concise, elegant, and rooted in creativity. 10 PRINT even being rewritten with many different variations exploring this simple algorithm in further depth.</p>
<p>Code should not only be executed, but read, in close reading form as is done with literature to reveal inherent biases, beauties, and cultural impregnations of the time and place of the author. Like poetry is a sign of its time, the culture and ideas of their author, emotions, and feelings so is code an exploration in what is valued and what is percieved at the time of creation. To write code is to interact with it with the methodology of a poetic science. It’s not just a science or just designing a ruleset but a play with creativity, and imagination in the forefront. To write code is to interact with it in time and society, execution, and errors further influencing the former and the former influencing the latter.</p>
<p>Programming I believe to be essentially a poetic act. Code doesn’t have to be poetic in and of itself even if it could be taken for instance the examples of &quot;Code Poetry&quot; but does realize a poetic experience between computer, writer, and audience. An expressive medium that reflects the creativity and cultural context of the author evoking emotion in many ways. Be that from the raw textual qualities, the relation between, or its ouptut. Looking at code with this mindset opens us up to interact and engage more with the digital world we have created in a meaninful and determined fashion. So, I like to conclude that yes code is poetic.</p>

	    `)
    },
    {
	type: "document",
	title: "Bibliography",
	content: window.utils.formatDocumentContent(`
	    <h1 id="bibliography">Bibliography</h1>
<p>Alan F. Blackwell, et al. Live Coding: A User’s Manual. MIT Press, 2022.</p>
<p>Jorge Luis Borges. The Library of Babel, 1941. <a href="https://en.wikipedia.org/wiki/The_Library_of_Babel">https://en.wikipedia.org/wiki/The_Library_of_Babel</a></p>
<p>James Bridle. Ways of Being: Animals, Plants, Machines: The Search for a Planetary Intelligence. Picador USA, 2023.</p>
<p>Anthony Glyn Burton and Wendy Hui Kyong Chun. Algorithmic Authenticity: An Overview. Meson Press, 2023.</p>
<p>Albert Camus. Create Dangerously, 1957.</p>
<p>Wendy Hui Kyong Chun. “Programmed Visions: Software and Memory.” Choice Reviews Online, vol. 49, no. 05, 2012, pp. 49–2711. <a href="https://doi.org/10.5860/choice.49-2711">https://doi.org/10.5860/choice.49-2711</a></p>
<p>Geoff Cox and Alex McLean. Speaking Code: Coding as Aesthetic and Political Expression. MIT Press, 2012. <a href="http://ci.nii.ac.jp/ncid/BB13182615">http://ci.nii.ac.jp/ncid/BB13182615</a></p>
<p>Geoff Cox and Winnie Soon. Aesthetic Programming: A Handbook of Software Studies. Open Humanities Press, 2020. <a href="https://library.oapen.org/bitstream/20.500.12657/46909/1/Soon-Cox_2020_Aesthetic-Programming.pdf">https://library.oapen.org/bitstream/20.500.12657/46909/1/Soon-Cox_2020_Aesthetic-Programming.pdf</a></p>
<p>Florian Cramer. “Digital Code and Literary Text.” P0es1s, 27 Sept. 2001.</p>
<p>Martin Dodge and Rob Kitchin. Code/Space. MIT Press, 2011. <a href="https://doi.org/10.7551/mitpress/9780262042482.001.0001">https://doi.org/10.7551/mitpress/9780262042482.001.0001</a></p>
<p>Anthony Dunne and Fiona Raby. Speculative Everything: Design, Fiction, and Social Dreaming. MIT Press, 2013. <a href="https://doi.org/10.5860/choice.51-5390">https://doi.org/10.5860/choice.51-5390</a></p>
<p>Clement Greenberg. Homemade Esthetics: Observations on Art and Taste. Oxford University Press, 2000.</p>
<p>Heidi Hart. “Timothy Morton (2021). All Art Is Ecological.” Journal of Ecohumanism, vol. 1, no. 1, 2022, pp. 77–80. <a href="https://doi.org/10.33182/joe.v1i1.2061">https://doi.org/10.33182/joe.v1i1.2061</a></p>
<p>William Kahan and K.C. Ng. “Sqrt Implementation in Fdlibm.” 1986. <a href="https://www.netlib.org/fdlibm/e_sqrt.c">https://www.netlib.org/fdlibm/e_sqrt.c</a></p>
<p>David Kushner. “The Wizardry of Id [Video Games].” IEEE Spectrum, vol. 39, no. 8, 2002, pp. 42–47. <a href="https://doi.org/10.1109/mspec.2002.1021943">https://doi.org/10.1109/mspec.2002.1021943</a>
Benjamin Labatut. The MANIAC. Penguin Group, 2024.</p>
<p>Chris Lomont. “Fast Inverse Square Root.” Dept. of Mathematics, Purdue University, 2003.</p>
<p>Lev Manovich. Software Takes Command. Bloomsbury Academic, 2013. <a href="https://doi.org/10.5040/9781472544988">https://doi.org/10.5040/9781472544988</a></p>
<p>Lev Manovich. The Language of New Media. MIT Press, 2001. <a href="http://dss-edit.com/plu/Manovich-">http://dss-edit.com/plu/Manovich-</a>
Lev_The_Language_of_the_New_Media.pdf</p>
<p>Mark C. Marino. Critical Code Studies. MIT Press, 2020. <a href="https://doi.org/10.7551/mitpress/12122.001.0001">https://doi.org/10.7551/mitpress/12122.001.0001</a></p>
<p>Charles McEniry. “The Mathematics Behind the Fast Inverse Square Root Function Code.” 2007.</p>
<p>Nick Montfort. “A Platform Poetics.” <a href="https://thedigitalreview.com/issue01/montfort-a-platform-practice/begin.html">https://thedigitalreview.com/issue01/montfort-a-platform-practice/begin.html</a></p>
<p>Nick Montfort. “Generating Narrative Variation in Interactive Fiction.” 2007.</p>
<p>Nick Montfort, et al. 10 PRINT CHR$(205.5+RND(1)); GOTO 10. MIT Press, 2012. <a href="https://doi.org/10.7551/mitpress/9040.001.0001">https://doi.org/10.7551/mitpress/9040.001.0001</a></p>
<p>Rys. “Beyond3D - Origin of Quake3’s Fast InvSqrt().” <a href="https://www.beyond3d.com/content/articles/8/">https://www.beyond3d.com/content/articles/8/</a></p>
<p>Rys. “Beyond3D - Origin of Quake3’s Fast InvSqrt() - Part Two.” <a href="https://www.beyond3d.com/content/articles/15/">https://www.beyond3d.com/content/articles/15/</a></p>
<p>Winnie Soon. “Executing Liveness: An Examination of the Live Dimension of Code Inter-actions in Software (Art) Practice.” Leonardo, vol. 51, no. 5, 2018, p. 530. <a href="https://doi.org/10.1162/leon_a_01669">https://doi.org/10.1162/leon_a_01669</a></p>
<p>Betty A. Toole. Ada, the Enchantress of Numbers. Strawberry Press, 1992. <a href="https://openlibrary.org/books/OL22619654M/Ada_the_enchantress_of_numbers">https://openlibrary.org/books/OL22619654M/Ada_the_enchantress_of_numbers</a></p>
<p>John von Neumann and Herman H. Goldstine. “Planning and Coding of Problems for an Electronic Computing Instrument.” 1947. <a href="http://ci.nii.ac.jp/ncid/BA29275660">http://ci.nii.ac.jp/ncid/BA29275660</a></p>
<p>Ludwig Wittgenstein. Philosophical Investigations. Wiley-Blackwell, 2010.</p>
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
        type: "program",
        title: "Whitespace", // New Whitespace application
        run: typeof window.programs.whitespaceRun === 'function' ? window.programs.whitespaceRun : () => console.error("Whitespace program not loaded.")
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

