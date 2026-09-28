/* =========================================================
   CONFIGURATION
   ========================================================= */

// Preserve saved data from before the Ketchump rename on the same origin.
try {
    for (const suffix of ['last-viewed', 'favs', 'theme']) {
        const key = `ketchump-${suffix}`;
        const previousValue = localStorage.getItem(`dexora-${suffix}`);
        if (localStorage.getItem(key) === null && previousValue !== null) {
            localStorage.setItem(key, previousValue);
        }
    }
} catch {
    // Storage may be unavailable in restricted browser contexts.
}

const TYPES = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy'
];

// Matching representatives keep type cards instant without extra API requests.
const TYPE_CARD_POKEMON = {
    normal: [133, 143, 52],
    fire: [4, 37, 155],
    water: [7, 54, 158],
    electric: [25, 135, 403],
    grass: [1, 152, 252],
    ice: [131, 215, 363],
    fighting: [56, 66, 447],
    poison: [23, 29, 109],
    ground: [27, 104, 231],
    flying: [16, 41, 163],
    psychic: [63, 196, 280],
    bug: [10, 123, 214],
    rock: [74, 95, 246],
    ghost: [92, 200, 353],
    dragon: [147, 371, 443],
    dark: [197, 228, 261],
    steel: [81, 304, 374],
    fairy: [35, 39, 175]
};

const COLORS = {
    normal: '#929DA3',
    fire: '#F97316',
    water: '#3B82F6',
    electric: '#EAB308',
    grass: '#4CAF50',
    ice: '#38BDF8',
    fighting: '#DC2626',
    poison: '#9333EA',
    ground: '#C98B3C',
    flying: '#60A5FA',
    psychic: '#EC4899',
    bug: '#84CC16',
    rock: '#A38C5A',
    ghost: '#6D5BD0',
    dragon: '#4338CA',
    dark: '#374151',
    steel: '#64748B',
    fairy: '#F472B6'
};

// Signature Z-Moves from Pokémon Showdown's Generation VII item data:
// https://github.com/smogon/pokemon-showdown/blob/master/data/items.ts
// Match exact PokéAPI form names; generic type-based Z-Moves are not listed.
const SIGNATURE_Z_MOVES = [
    {
        forms: ["pikachu"],
        name: "Catastropika", crystal: "Pikanium Z", move: "Volt Tackle"
    },
    {
        forms: ["pikachu-original-cap", "pikachu-hoenn-cap", "pikachu-sinnoh-cap", "pikachu-unova-cap", "pikachu-kalos-cap", "pikachu-alola-cap", "pikachu-partner-cap"],
        name: "10,000,000 Volt Thunderbolt", crystal: "Pikashunium Z", move: "Thunderbolt"
    },
    {
        forms: ["raichu-alola"],
        name: "Stoked Sparksurfer", crystal: "Aloraichium Z", move: "Thunderbolt"
    },
    {
        forms: ["eevee"],
        name: "Extreme Evoboost", crystal: "Eevium Z", move: "Last Resort"
    },
    {
        forms: ["snorlax"],
        name: "Pulverizing Pancake", crystal: "Snorlium Z", move: "Giga Impact"
    },
    {
        forms: ["mew"],
        name: "Genesis Supernova", crystal: "Mewnium Z", move: "Psychic"
    },
    {
        forms: ["decidueye"],
        name: "Sinister Arrow Raid", crystal: "Decidium Z", move: "Spirit Shackle"
    },
    {
        forms: ["incineroar"],
        name: "Malicious Moonsault", crystal: "Incinium Z", move: "Darkest Lariat"
    },
    {
        forms: ["primarina"],
        name: "Oceanic Operetta", crystal: "Primarium Z", move: "Sparkling Aria"
    },
    {
        forms: ["tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini"],
        name: "Guardian of Alola", crystal: "Tapunium Z", move: "Nature's Madness"
    },
    {
        forms: ["marshadow"],
        name: "Soul-Stealing 7-Star Strike", crystal: "Marshadium Z", move: "Spectral Thief"
    },
    {
        forms: ["kommo-o"],
        name: "Clangorous Soulblaze", crystal: "Kommonium Z", move: "Clanging Scales"
    },
    {
        forms: ["lycanroc-midday", "lycanroc-midnight", "lycanroc-dusk"],
        name: "Splintered Stormshards", crystal: "Lycanium Z", move: "Stone Edge"
    },
    {
        forms: ["mimikyu-disguised", "mimikyu-busted"],
        name: "Let's Snuggle Forever", crystal: "Mimikium Z", move: "Play Rough"
    },
    {
        forms: ["solgaleo", "necrozma-dusk"],
        name: "Searing Sunraze Smash", crystal: "Solganium Z", move: "Sunsteel Strike"
    },
    {
        forms: ["lunala", "necrozma-dawn"],
        name: "Menacing Moonraze Maelstrom", crystal: "Lunalium Z", move: "Moongeist Beam"
    },
    {
        forms: ["necrozma-ultra"],
        name: "Light That Burns the Sky", crystal: "Ultranecrozium Z", move: "Photon Geyser"
    }
];

function renderSignatureZMove(pokemon) {
    const zMove = SIGNATURE_Z_MOVES.find(entry => entry.forms.includes(pokemon.name));
    if (!zMove) return '';

    return `
        <div class="signature-z-move">
            <h3>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="m14 2-9 12h6l-1 8 9-12h-6z" />
                </svg>
                Signature Z-Move
            </h3>
            <div class="ability">
                <b>${zMove.name}</b>
                <p>Requires ${zMove.crystal} and ${zMove.move}.</p>
            </div>
        </div>
    `;
}

const GENERATION_NAMES = {
    'generation-i': 'Generation I',
    'generation-ii': 'Generation II',
    'generation-iii': 'Generation III',
    'generation-iv': 'Generation IV',
    'generation-v': 'Generation V',
    'generation-vi': 'Generation VI',
    'generation-vii': 'Generation VII',
    'generation-viii': 'Generation VIII',
    'generation-ix': 'Generation IX'
};

const REGION_NAMES = {
    'generation-i': 'Kanto',
    'generation-ii': 'Johto',
    'generation-iii': 'Hoenn',
    'generation-iv': 'Sinnoh',
    'generation-v': 'Unova',
    'generation-vi': 'Kalos',
    'generation-vii': 'Alola',
    'generation-viii': 'Galar',
    'generation-ix': 'Paldea'
};

const app = document.querySelector('#app');

let list = [];
let enriched = new Map();
let current = 'home';
let pokemonFoodDataPromise;
let shinyAudioContext;
let shinySoundBuffer;
let shinySoundLoading;
let shinySoundSource;

function prepareShinySound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        shinyAudioContext ||= new AudioContext();
        shinySoundLoading ||= fetch('/media/sounds/legends-arceus-shiny.mp3')
            .then(response => {
                if (!response.ok) throw new Error('Shiny sound could not be loaded');
                return response.arrayBuffer();
            })
            .then(bytes => shinyAudioContext.decodeAudioData(bytes))
            .then(buffer => { shinySoundBuffer = buffer; })
            .catch(() => { shinySoundLoading = null; });
        return Promise.all([shinyAudioContext.resume(), shinySoundLoading]).catch(() => { });
    } catch {
        // Audio support must not prevent changing the Pokémon's appearance.
    }
}

function playShinySound() {
    const context = shinyAudioContext;
    if (!context || context.state !== 'running' || !shinySoundBuffer) return;

    shinySoundSource?.stop();
    const source = context.createBufferSource();
    source.buffer = shinySoundBuffer;
    source.connect(context.destination);
    source.onended = () => {
        source.disconnect();
        if (shinySoundSource === source) shinySoundSource = null;
    };
    shinySoundSource = source;
    source.start();
}


/* =========================================================
   GENERAL HELPERS
   ========================================================= */

const cap = (value) => {
    return (value || '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const foodSlug = (value) => (value || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9-]/g, '');

const foodImage = name => {
    const slug = foodSlug(name);
    return `https://www.serebii.net/itemdex/sprites/legends/${slug}.png`;
};

const foodImageChip = name => `
    <span class="food-chip" role="img" tabindex="0" title="${name}" aria-label="${name}">
        <img src="${foodImage(name)}" alt="${name}" loading="lazy">
    </span>
`;

const displayPokemonName = (name) => {
    const mega = (name || '').match(/^(.*)-mega(?:-([a-z]+))?$/i);
    return mega
        ? `mega-${mega[1]}${mega[2] ? `-${mega[2]}` : ''}`
        : list.find(pokemon => pokemon.name === name)?.speciesName ||
          list.filter(pokemon => name?.startsWith(pokemon.name + '-'))
              .sort((left, right) => right.name.length - left.name.length)[0]?.speciesName ||
          name;
};

const MEANINGFUL_FORM_SUFFIXES = {
    deoxys: ['attack', 'defense', 'speed'], shaymin: ['sky'], giratina: ['origin'],
    rotom: ['heat', 'wash', 'frost', 'fan', 'mow'], castform: ['sunny', 'rainy', 'snowy'],
    basculin: ['blue-striped', 'white-striped'], tornadus: ['therian'],
    thundurus: ['therian'], landorus: ['therian'], kyurem: ['black', 'white'],
    keldeo: ['resolute'], meloetta: ['pirouette'], hoopa: ['unbound'],
    zygarde: ['10-power-construct', 'complete'], oricorio: ['pom-pom', 'pau', 'sensu'],
    lycanroc: ['midnight', 'dusk'], necrozma: ['dusk', 'dawn', 'ultra'],
    zacian: ['crowned'], zamazenta: ['crowned'], urshifu: ['rapid-strike'],
    calyrex: ['ice', 'shadow'], tauros: ['paldea-combat-breed', 'paldea-blaze-breed', 'paldea-aqua-breed'],
    toxtricity: ['low-key'], indeedee: ['female'], dudunsparce: ['three-segment'],
    maushold: ['family-of-three'], tatsugiri: ['droopy', 'stretchy'],
    squawkabilly: ['blue-plumage', 'yellow-plumage', 'white-plumage'],
    ogerpon: ['wellspring-mask', 'hearthflame-mask', 'cornerstone-mask'],
    terapagos: ['terastal', 'stellar'], dialga: ['origin'], palkia: ['origin'],
    shellos: ['east'], gastrodon: ['east'], deerling: ['summer', 'autumn', 'winter'],
    sawsbuck: ['summer', 'autumn', 'winter'], darmanitan: ['galar-standard']
};

function isMeaningfulPokemonForm(name, speciesName) {
    if (name?.split('-').includes('totem')) return false;
    if (!name || !speciesName || name === speciesName || /-gmax$/.test(name)) return false;
    if (/^pikachu-.*-cap$/.test(name) || [
        'greninja-ash', 'greninja-battle-bond', 'pikachu-belle', 'pikachu-cosplay',
        'pikachu-libre', 'pikachu-phd', 'pikachu-pop-star', 'pikachu-rock-star', 'zarude-dada'
    ].includes(name)) return false;
    if (/-(alola|galar|hisui|paldea)$/.test(name)) return true;
    if (/^arceus-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)$/.test(name)) return true;
    return (MEANINGFUL_FORM_SUFFIXES[speciesName] || []).some(suffix => name === `${speciesName}-${suffix}`);
}

function meaningfulFormLabel(name, speciesName) {
    const regions = {
        alola: 'Alolan Form', galar: 'Galarian Form',
        hisui: 'Hisuian Form', paldea: 'Paldean Form'
    };
    const region = name.match(/-(alola|galar|hisui|paldea)$/)?.[1];
    if (region) return regions[region];
    if (speciesName === 'arceus') return `${cap(name.slice(7))} Type`;
    if (name.includes('-mega')) return `Mega ${cap(name.replace(/-mega-?/i, ' ').replace(/-/g, ' '))}`;
    if (name === 'darmanitan-galar-standard') return 'Galarian Standard';
    return cap(name.slice(speciesName.length + 1).replace(/-/g, ' '));
}

function pokemonFormLabel(name, speciesName = displayPokemonName(name)) {
    return name?.startsWith(`${speciesName}-`) && isMeaningfulPokemonForm(name, speciesName)
        ? meaningfulFormLabel(name, speciesName)
        : '';
}

function generationForDexNumber(number) {
    const limits = [151, 251, 386, 493, 649, 721, 809, 905, 1025];
    const index = limits.findIndex(limit => number <= limit);
    return index >= 0 ? `Generation ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][index]}` : 'Unknown Generation';
}

function addPokemonGenerations(pokemonList) {
    const dexNumbers = new Map(
        pokemonList.filter(pokemon => pokemon.id <= 1025).map(pokemon => [pokemon.name, pokemon.id])
    );

    const basePokemon = [...pokemonList.filter(pokemon => pokemon.id <= 1025)
        .reduce((bySpecies, pokemon) => {
            const current = bySpecies.get(pokemon.speciesName);
            if (!current || pokemon.name === pokemon.speciesName ||
                (current.name !== current.speciesName && pokemon.id < current.id)) {
                bySpecies.set(pokemon.speciesName, pokemon);
            }
            return bySpecies;
        }, new Map()).values()];

    return basePokemon.map(pokemon => {
        const baseName = pokemon.name.replace(/-mega(?:-[a-z]+)?$/i, '');
        const dexNumber = pokemon.dexNumber || (pokemon.id <= 1025
            ? pokemon.id
            : (dexNumbers.get(baseName) || pokemon.id));
        return {
            ...pokemon,
            dexNumber,
            generation: generationForDexNumber(dexNumber)
        };
    });
}

function setupCarousels(root = app) {
    root.querySelectorAll('.types, .evo').forEach(scroller => {
        if (scroller.closest('.carousel')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'carousel';
        scroller.parentNode.insertBefore(wrapper, scroller);

        const isEvolutionCarousel = scroller.classList.contains('evo');
        if (!isEvolutionCarousel) {
            wrapper.classList.add('carousel-types');
            wrapper.append(scroller);
            return;
        }

        const controls = document.createElement('div');
        controls.className = 'carousel-controls';

        const previous = document.createElement('button');
        previous.className = 'carousel-arrow';
        previous.type = 'button';
        previous.textContent = '‹';
        previous.setAttribute('aria-label', 'Scroll left');

        const next = document.createElement('button');
        next.className = 'carousel-arrow';
        next.type = 'button';
        next.textContent = '›';
        next.setAttribute('aria-label', 'Scroll right');

        wrapper.classList.add('carousel-evo');
        wrapper.append(previous, scroller, next);

        const update = () => {
            const maxScroll = scroller.scrollWidth - scroller.clientWidth;
            const hasOverflow = maxScroll > 2;
            wrapper.classList.toggle('has-overflow', hasOverflow);
            previous.hidden = !hasOverflow;
            next.hidden = !hasOverflow;
            previous.disabled = scroller.scrollLeft <= 2;
            next.disabled = scroller.scrollLeft >= maxScroll - 2;
        };

        const scrollByCard = direction => {
            const firstItem = scroller.firstElementChild;
            const styles = getComputedStyle(scroller);
            const gap = parseFloat(styles.columnGap || styles.gap) || 0;
            const step = firstItem
                ? firstItem.getBoundingClientRect().width + gap
                : scroller.clientWidth * 0.8;
            scroller.scrollBy({ left: direction * step, behavior: 'smooth' });
        };

        previous.addEventListener('click', () => scrollByCard(-1));
        next.addEventListener('click', () => scrollByCard(1));
        scroller.addEventListener('scroll', update, { passive: true });
        wrapper.updateCarousel = update;
        requestAnimationFrame(update);
    });
}

window.addEventListener('resize', () => {
    app.querySelectorAll('.carousel').forEach(wrapper => wrapper.updateCarousel?.());
});

const badge = (type) => {
    const color = COLORS[type] || '#64748b';

    return `
        <span
            class="badge"
            style="background:${color}"
        >
            ${cap(type)}
        </span>
    `;
};

function itemIcon(name) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`;
}


/* =========================================================
   FAVORITES / LOCAL STORAGE
   ========================================================= */

let favs = [];

const POKEMON_BODY_COLORS = {
    black: '#374151', blue: '#3B82F6', brown: '#A87848',
    gray: '#94A3B8', green: '#4CAF50', pink: '#F472B6',
    purple: '#9333EA', red: '#EF4444', white: '#CBD5E1',
    yellow: '#EAB308'
};

function readLastViewedPokemon() {
    try {
        const pokemon = JSON.parse(localStorage.getItem('ketchump-last-viewed'));
        if (Number.isSafeInteger(pokemon?.id) && pokemon.id > 0 &&
            typeof pokemon.name === 'string' && pokemon.name.trim()) {
            return {
                id: pokemon.id,
                name: pokemon.name,
                color: Object.hasOwn(POKEMON_BODY_COLORS, pokemon.color) ? pokemon.color : null
            };
        }
    } catch {
        // Keep the default hero when storage is unavailable or invalid.
    }
    return { id: 25, name: 'pikachu', color: 'yellow' };
}

let lastViewedPokemon = readLastViewedPokemon();

function rememberViewedPokemon(pokemon, species) {
    lastViewedPokemon = { id: species?.id || pokemon.id, name: species?.name || pokemon.name, color: species?.color?.name };
    try {
        localStorage.setItem('ketchump-last-viewed', JSON.stringify(lastViewedPokemon));
    } catch {
        // The hero still updates for this session when storage is unavailable.
    }
}

function readFavs() {
    try {
        const raw = JSON.parse(
            localStorage.getItem('ketchump-favs') || '[]'
        );

        if (!Array.isArray(raw)) {
            return [];
        }

        return [
            ...new Set(
                raw
                    .map(Number)
                    .filter(Number.isFinite)
            )
        ];
    } catch {
        return [];
    }
}

favs = readFavs();

function saveFavs() {
    localStorage.setItem(
        'ketchump-favs',
        JSON.stringify(favs)
    );

    updateFavCount();
}

function updateFavCount() {
    document
        .querySelectorAll('[data-fav-count]')
        .forEach(element => {
            element.textContent = favs.length;
        });
}

function toggleFav(id) {
    id = Number(id);

    if (favs.includes(id)) {
        favs = favs.filter(favId => favId !== id);
    } else {
        favs = [...favs, id];
    }

    saveFavs();

    if (current === 'favorites') {
        renderFavorites();
    }
}


/* =========================================================
   EVOLUTION HELPERS
   ========================================================= */

function evolutionText(detail) {
    if (!detail) {
        return 'Base form';
    }

    const requirements = [];

    if (detail.item?.name) {
        requirements.push(`Use ${cap(detail.item.name)}`);
    }

    if (detail.held_item?.name) {
        requirements.push(`Hold ${cap(detail.held_item.name)}`);
    }

    if (detail.min_level) {
        requirements.push(`Level ${detail.min_level}`);
    }

    if (detail.min_happiness) {
        requirements.push(`Happiness ${detail.min_happiness}+`);
    }

    if (detail.min_affection) {
        requirements.push(`Affection ${detail.min_affection}+`);
    }

    if (detail.min_beauty) {
        requirements.push(`Beauty ${detail.min_beauty}+`);
    }

    if (detail.time_of_day) {
        requirements.push(cap(detail.time_of_day));
    }

    if (detail.location?.name) {
        requirements.push(`at ${cap(detail.location.name)}`);
    }

    if (detail.known_move?.name) {
        requirements.push(`know ${cap(detail.known_move.name)}`);
    }

    if (detail.known_move_type?.name) {
        requirements.push(
            `know a ${cap(detail.known_move_type.name)} move`
        );
    }

    if (detail.gender === 1) {
        requirements.push('female');
    }

    if (detail.gender === 2) {
        requirements.push('male');
    }

    if (detail.needs_overworld_rain) {
        requirements.push('while raining');
    }

    if (detail.turn_upside_down) {
        requirements.push('turn device upside down');
    }

    if (detail.trade_species?.name) {
        requirements.push(
            `trade for ${cap(detail.trade_species.name)}`
        );
    }

    if (
        !requirements.length &&
        detail.trigger?.name
    ) {
        requirements.push(
            cap(detail.trigger.name)
        );
    }

    return requirements.join(' · ') || 'Special evolution';
}


/* =========================================================
   RECOMMENDED BATTLE ITEMS
   ========================================================= */

function recommendedItems(pokemon) {
    const stats = Object.fromEntries(
        pokemon.stats.map(stat => [
            stat.stat.name,
            stat.base_stat
        ])
    );

    const types = pokemon.types.map(
        type => type.type.name
    );

    const items = [];

    const attack = stats.attack || 0;
    const specialAttack = stats['special-attack'] || 0;
    const speed = stats.speed || 0;

    if (specialAttack > attack + 15) {
        items.push([
            'choice-specs',
            'Choice Specs',
            'Boosts Special Attack, but locks the user into one move.'
        ]);
    } else if (attack > specialAttack + 15) {
        items.push([
            'choice-band',
            'Choice Band',
            'Boosts Attack, but locks the user into one move.'
        ]);
    } else {
        items.push([
            'life-orb',
            'Life Orb',
            'Boosts damaging moves at the cost of some HP after attacking.'
        ]);
    }

    if (speed >= 100) {
        items.push([
            'choice-scarf',
            'Choice Scarf',
            'Boosts Speed, useful when you want this Pokémon to move first more often.'
        ]);
    } else {
        items.push([
            'leftovers',
            'Leftovers',
            'Restores a little HP each turn and is a flexible durability option.'
        ]);
    }

    const typeItems = {
        fire: 'charcoal',
        water: 'mystic-water',
        grass: 'miracle-seed',
        electric: 'magnet',
        ice: 'never-melt-ice',
        fighting: 'black-belt',
        poison: 'poison-barb',
        ground: 'soft-sand',
        flying: 'sharp-beak',
        psychic: 'twisted-spoon',
        bug: 'silver-powder',
        rock: 'hard-stone',
        ghost: 'spell-tag',
        dragon: 'dragon-fang',
        dark: 'black-glasses',
        steel: 'metal-coat',
        fairy: 'fairy-feather',
        normal: 'silk-scarf'
    };

    const typeItem = typeItems[types[0]];

    if (typeItem) {
        items.push([
            typeItem,
            cap(typeItem),
            `Boosts ${cap(types[0])}-type moves and matches this Pokémon's primary type.`
        ]);
    }

    return items.slice(0, 3);
}


/* =========================================================
   API
   ========================================================= */

const pendingJsonRequests = new Map();

function json(url) {
    if (!pendingJsonRequests.has(url)) {
        const request = fetch(url).then(response => {
            if (!response.ok) throw new Error('Request failed');
            return response.json();
        }).finally(() => pendingJsonRequests.delete(url));
        pendingJsonRequests.set(url, request);
    }

    return pendingJsonRequests.get(url);
}

async function getFull(id) {
    const pokemonId = Number(id);

    if (enriched.has(pokemonId)) {
        return enriched.get(pokemonId);
    }

    const data = await json(`/api/pokemon/${id}`);

    enriched.set(pokemonId, data);

    return data;
}

const abilityDescriptionCache = new Map();

async function getAbilityDescription(url) {
    if (abilityDescriptionCache.has(url)) {
        return abilityDescriptionCache.get(url);
    }

    const ability = await json(url);
    const effect = (ability.effect_entries || [])
        .find(entry => entry.language?.name === 'en')
        ?.short_effect;
    const flavor = (ability.flavor_text_entries || [])
        .find(entry => entry.language?.name === 'en')
        ?.flavor_text;
    const description = (effect || flavor || 'Ability description unavailable.')
        .replace(/[\n\f]/g, ' ')
        .trim();

    abilityDescriptionCache.set(url, description);
    return description;
}

function getPokemonFoodData() {
    if (!pokemonFoodDataPromise) {
        pokemonFoodDataPromise = json('/data/pokemon-food.json').catch(error => {
            console.warn('Unable to load Pokémon food preferences:', error);
            return { legendsArceus: {} };
        });
    }

    return pokemonFoodDataPromise;
}


/* =========================================================
   APP INITIALIZATION
   ========================================================= */

async function init() {
    const theme =
        localStorage.getItem('ketchump-theme') ||
        'light';

    setTheme(theme);

    favs = readFavs();

    updateFavCount();

    const start =
        location.hash.replace('#', '') ||
        'home';

    if (start === 'favorites') {
        renderFavorites();
        loadListInBackground();
        return;
    }

    try {
        list = addPokemonGenerations(await json(
            '/api/pokemon/list?limit=1025&v=3'
        ));

        const validPages = [
            'home',
            'pokedex',
            'types',
            'trainers'
        ];

        navigate(
            validPages.includes(start)
                ? start
                : 'home'
        );
    } catch (error) {
        console.error(
            'Pokédex list failed:',
            error
        );

        app.innerHTML = `
            <div class="empty">
                <h2>Could not load Pokédex</h2>
                <p>${error.message}</p>

                <button onclick="location.reload()">
                    Try again
                </button>
            </div>
        `;
    }
}

async function loadListInBackground() {
    try {
        list = addPokemonGenerations(await json(
            '/api/pokemon/list?limit=1025&v=3'
        ));

        if (current === 'favorites') {
            renderFavorites();
        }
    } catch (error) {
        console.warn(
            'Background Pokédex list failed',
            error
        );
    }
}


/* =========================================================
   THEME
   ========================================================= */

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(
        'ketchump-theme',
        theme
    );

    const themeToggle =
        document.querySelector('#themeToggle');

    if (theme === 'dark') {
        // Sun
        themeToggle.innerHTML = `
            <svg
                class="theme-icon theme-sun"
                viewBox="0 0 24 24"
                aria-hidden="true">

                <circle
                    cx="12"
                    cy="12"
                    r="4">
                </circle>

                <path d="
                    M12 2v2
                    M12 20v2
                    M4.93 4.93l1.41 1.41
                    M17.66 17.66l1.41 1.41
                    M2 12h2
                    M20 12h2
                    M4.93 19.07l1.41-1.41
                    M17.66 6.34l1.41-1.41
                ">
                </path>

            </svg>
        `;
    } else {
        // Moon
        themeToggle.innerHTML = `
            <svg
                class="theme-icon theme-moon"
                viewBox="0 0 24 24"
                aria-hidden="true">

                <path
                    d="M21 12.79A9 9 0 1 1 11.21 3
                       7 7 0 0 0 21 12.79Z">
                </path>

            </svg>
        `;
    }

    themeToggle.setAttribute(
        'aria-label',
        theme === 'dark'
            ? 'Switch to light mode'
            : 'Switch to dark mode'
    );
}


document
    .querySelector('#themeToggle')
    .addEventListener('click', () => {

        const currentTheme =
            document.documentElement.dataset.theme;

        setTheme(
            currentTheme === 'dark'
                ? 'light'
                : 'dark'
        );
    });


/* =========================================================
   NAVIGATION
   ========================================================= */

document.addEventListener('click', event => {
    const button = event.target.closest(
        '[data-page]'
    );

    if (!button) {
        return;
    }

    event.preventDefault();

    navigate(button.dataset.page);

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
    });
});

document.addEventListener('wheel', event => {
    const scroller = event.target.closest('.types, .evo');
    if (
        !scroller ||
        scroller.scrollWidth <= scroller.clientWidth ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
    ) {
        return;
    }

    event.preventDefault();
    scroller.scrollLeft += event.deltaY;
}, { passive: false });

let horizontalTouchScroll = null;

document.addEventListener('touchstart', event => {
    const scroller = event.target.closest('.types, .evo');
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) {
        horizontalTouchScroll = null;
        return;
    }

    const touch = event.touches[0];
    horizontalTouchScroll = {
        scroller,
        x: touch.clientX,
        y: touch.clientY,
        scrollLeft: scroller.scrollLeft
    };
}, { passive: true });

document.addEventListener('touchmove', event => {
    if (!horizontalTouchScroll) return;

    const touch = event.touches[0];
    const deltaX = horizontalTouchScroll.x - touch.clientX;
    const deltaY = horizontalTouchScroll.y - touch.clientY;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

    event.preventDefault();
    horizontalTouchScroll.scroller.scrollLeft =
        horizontalTouchScroll.scrollLeft + deltaX;
}, { passive: false });

const clearHorizontalTouchScroll = () => {
    horizontalTouchScroll = null;
};

document.addEventListener('touchend', clearHorizontalTouchScroll, { passive: true });
document.addEventListener('touchcancel', clearHorizontalTouchScroll, { passive: true });

function activeNav() {
    document
        .querySelectorAll('[data-page]')
        .forEach(button => {
            button.classList.toggle(
                'active',
                button.dataset.page === current
            );
        });

    updateFavCount();
}

function navigate(page) {
    current = page;

    if (location.hash !== `#${page}`) {
        history.replaceState(
            null,
            '',
            `#${page}`
        );
    }

    activeNav();

    if (page === 'home') {
        return home();
    }

    if (page === 'pokedex') {
        return pokedex();
    }

    if (page === 'types') {
        return typesPage();
    }

    if (page === 'favorites') {
        return renderFavorites();
    }

    if (page === 'trainers') {
        return trainersPage();
    }
}

window.addEventListener(
    'hashchange',
    () => {
        const page =
            location.hash.replace('#', '');

        const validPages = [
            'home',
            'pokedex',
            'types',
            'favorites',
            'trainers'
        ];

        if (validPages.includes(page)) {
            navigate(page);
        }
    }
);


/* =========================================================
   POKÉMON CARDS
   ========================================================= */

function card(pokemon, types = []) {
    if (!pokemon) {
        return '';
    }

    const image =
        pokemon.image ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const isFavorite = favs.includes(Number(pokemon.id));
    const displayName = displayPokemonName(pokemon.name);
    const knownType = types[0] || '';
    const pokemonColor = COLORS[knownType] || 'var(--red)';

    return `
        <article
            class="poke-card"
            data-id="${pokemon.id}">

            <button
                class="pokeball-button ${isFavorite ? 'active' : ''}"
                data-fav="${pokemon.id}"
                data-known-type="${knownType}"
                type="button"
                style="--pokemon-color: ${pokemonColor}"
                aria-pressed="${isFavorite}"
                aria-label="${isFavorite ? 'Remove' : 'Add'} ${cap(displayPokemonName(pokemon.name))} ${isFavorite ? 'from' : 'to'} My Pokémon">
                <span class="pokeball-icon"></span>
            </button>

            <small>
                #${String(pokemon.dexNumber || pokemon.id).padStart(4, '0')}
            </small>

            <img
                loading="lazy"
                src="${image}"
                alt="${cap(displayName)}">

            <h3>${cap(displayName)}</h3>

            <div>
                ${types.map(badge).join('')}
            </div>
        </article>
    `;
}

async function applyPokemonColor(button, id) {
    const knownType = button.dataset.knownType;

    if (knownType && COLORS[knownType]) {
        button.style.setProperty('--pokemon-color', COLORS[knownType]);
        return;
    }

    try {
        const data = await getFull(id);
        const primaryType = data.types?.[0]?.name;

        if (primaryType && COLORS[primaryType]) {
            button.style.setProperty('--pokemon-color', COLORS[primaryType]);
            button.dataset.knownType = primaryType;
        }
    } catch (error) {
        console.warn(`Could not load type color for Pokémon #${id}`, error);
    }
}

function updatePokeballState(button, id) {
    const isFavorite = favs.includes(Number(id));

    button.classList.toggle('active', isFavorite);
    button.setAttribute('aria-pressed', String(isFavorite));
}

function bindCards() {
    document
        .querySelectorAll('.poke-card')
        .forEach(cardElement => {
            cardElement.onclick = event => {
                if (event.target.closest('[data-fav]')) {
                    return;
                }

                showDetail(cardElement.dataset.id);
            };
        });

    document
        .querySelectorAll('[data-fav]')
        .forEach(button => {
            const id = Number(button.dataset.fav);

            updatePokeballState(button, id);

            // Only fetch extra detail data for Poké Balls that need their
            // selected color. This avoids loading 1,025 detail requests.
            if (favs.includes(id)) {
                applyPokemonColor(button, id);
            }

            button.onclick = async event => {
                event.stopPropagation();

                toggleFav(id);
                updatePokeballState(button, id);

                if (favs.includes(id)) {
                    await applyPokemonColor(button, id);
                }
            };
        });
}


/* =========================================================
   HOME PAGE
   ========================================================= */

function home() {
    const featuredPokemon = [
        1,
        4,
        7,
        25,
        6,
        94,
        133,
        143,
        149,
        150
    ];

    app.innerHTML = `
        <section class="hero">
            <div>
                <p class="hero-tagline">
                    Know ’Em. Ketch ’Em.
                </p>

                <h1>
                    There’s More to Every<br>
                    <em>Pokémon</em>
                </h1>

                <p>
                    From first forms to final evolutions, type matchups to iconic trainers—there’s always more to know.
                </p>

                <div class="search">
                    <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <circle cx="10.5" cy="10.5" r="7.5" />
                        <path d="m16 16 5 5" />
                    </svg>

                    <input
                        id="heroSearch"
                        placeholder="Search Pokémon by name or number"
                    >
                </div>
            </div>

            <img
                id="heroPokemon"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${lastViewedPokemon.id}.png"
                alt=""
            >
        </section>

        <section>
            <div class="section-title">
                <h2>Explore by Type</h2>

            </div>

            <div class="types">
                ${TYPES.map(type => `
                    <button class="type-tag"
                        style="--c:${COLORS[type]}"
                        data-type="${type}"
                    >
                        ${cap(type)}
                    </button>
                `).join('')}
            </div>
        </section>

        <section>
            <div class="section-title">
                <h2>Featured Pokémon</h2>
            </div>

            <div class="grid">
                ${featuredPokemon
            .map(id =>
                card(
                    list.find(
                        pokemon =>
                            pokemon.id === id
                    )
                )
            )
            .join('')}
            </div>
        </section>
    `;

    setupCarousels();
    bindCards();

    const heroPokemon = document.querySelector('#heroPokemon');
    const hero = heroPokemon.closest('.hero');
    const heroPokemonId = lastViewedPokemon.id;
    let artworkFailed = false;
    const setHeroColor = color => {
        hero.style.setProperty('--hero-color', POKEMON_BODY_COLORS[color] || '#94A3B8');
    };
    setHeroColor(lastViewedPokemon.color);
    if (!lastViewedPokemon.color) {
        getFull(heroPokemonId).then(data => {
            if (hero.isConnected && !artworkFailed) {
                setHeroColor(data.species?.color?.name);
            }
        }).catch(() => {
            // Keep the neutral tint if older saved data cannot be refreshed.
        });
    }
    heroPokemon.alt = cap(displayPokemonName(lastViewedPokemon.name));
    heroPokemon.addEventListener('error', () => {
        artworkFailed = true;
        setHeroColor('yellow');
        heroPokemon.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
        heroPokemon.alt = 'Pikachu';
    }, { once: true });

    document
        .querySelector('#heroSearch')
        .addEventListener(
            'keydown',
            event => {
                if (event.key === 'Enter') {
                    pokedex(
                        event.target.value
                    );
                }
            }
        );

    document
        .querySelectorAll('[data-type]')
        .forEach(button => {
            button.onclick = () => {
                pokedex(
                    '',
                    button.dataset.type
                );
            };
        });
}


/* =========================================================
   POKÉDEX
   ========================================================= */

async function pokedex(
    initial = '',
    initialType = 'all'
) {
    current = 'pokedex';

    activeNav();

    const selected =
        initialType !== 'all'
            ? [initialType]
            : [];

    app.innerHTML = `
        <div class="page-head">
            <h1>Pokédex</h1>

            <p>
                Explore and discover Pokémon
                from every generation.
            </p>
        </div>

        <div class="toolbar tag-toolbar">
            <div class="search">
                    <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <circle cx="10.5" cy="10.5" r="7.5" />
                        <path d="m16 16 5 5" />
                    </svg>

                <input
                    id="q"
                    value="${initial}"
                    placeholder="Search Pokémon by name or number"
                >
            </div>

            <div class="type-filter">
                <div class="type-filter-head">
                    <div>
                        <b>Filter by type</b>
                        <small>Select up to 2 types</small>
                    </div>

                    <button
                        id="clearTypes"
                        type="button"
                    >
                        Clear
                    </button>
                </div>

                <div class="type-tags">
                    ${TYPES.map(type => `
                        <button
                            type="button"
                            class="type-tag ${selected.includes(type) ? 'selected' : ''}"
                            data-filter-type="${type}"
                            style="--c:${COLORS[type]}"
                        >
                            ${cap(type)}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>

        <div
            id="filterSummary"
            class="filter-summary"
        ></div>

        <div
            id="results"
            class="grid"
        ></div>
    `;

    const tags = [
        ...document.querySelectorAll(
            '[data-filter-type]'
        )
    ];

    tags.forEach(tag => {
        tag.onclick = () => {
            const selectedCount =
                document.querySelectorAll(
                    '[data-filter-type].selected'
                ).length;

            if (
                !tag.classList.contains('selected') &&
                selectedCount >= 2
            ) {
                return;
            }

            tag.classList.toggle('selected');

            renderResults();
        };
    });

    document
        .querySelector('#clearTypes')
        .addEventListener('click', () => {
            tags.forEach(tag => {
                tag.classList.remove(
                    'selected'
                );
            });

            renderResults();
        });

    document
        .querySelector('#q')
        .addEventListener(
            'input',
            renderResults
        );

    renderResults();
}

async function renderResults() {
    const search =
        (
            document.querySelector('#q')?.value ||
            ''
        )
            .toLowerCase()
            .trim();

    const selectedTypes = [
        ...document.querySelectorAll(
            '[data-filter-type].selected'
        )
    ].map(
        element =>
            element.dataset.filterType
    );

    let results = list.filter(pokemon => {
        return (
            displayPokemonName(pokemon.name).includes(search) ||
            pokemon.name.replace(/-/g, ' ').includes(search) ||
            String(pokemon.dexNumber || pokemon.id) === search ||
            String(pokemon.id) === search
        );
    });

    for (const type of selectedTypes) {
        const typeData = await json(
            `/api/pokemon/type/${type}`
        );

        const ids = new Set(
            typeData.pokemon.map(entry => {
                return Number(
                    entry.pokemon.url
                        .match(/\/(\d+)\/$/)[1]
                );
            })
        );

        results = results.filter(
            pokemon =>
                ids.has(pokemon.id)
        );
    }

    const summary =
        document.querySelector(
            '#filterSummary'
        );

    if (summary) {
        if (selectedTypes.length) {
            summary.innerHTML = `
                <span>
                    ${results.length}
                    Pokémon found with
                </span>

                ${selectedTypes
                    .map(badge)
                    .join('')}

                <small>
                    Pokémon must match
                    ${selectedTypes.length === 2
                    ? 'both selected types'
                    : 'the selected type'
                }.
                </small>
            `;
        } else {
            summary.innerHTML = `
                <span>
                    ${results.length} Pokémon
                </span>

                <small>
                    Select one or two type tags to filter.
                </small>
            `;
        }
    }

    const resultContainer =
        document.querySelector('#results');

    resultContainer.innerHTML =
        results.length
            ? results
                .map(pokemon => card(pokemon))
                .join('')
            : `
                <div class="empty wide">
                    <h2>No matching Pokémon</h2>
                    <p>Try another type combination.</p>
                </div>
            `;

    bindCards();
}


/* =========================================================
   TYPE EXPLORER
   ========================================================= */

function typesPage() {
    const representatives = Object.fromEntries(TYPES.map(type => {
        const pool = TYPE_CARD_POKEMON[type];
        const id = pool[Math.floor(Math.random() * pool.length)];
        return [type, { id, name: list.find(pokemon => pokemon.id === id)?.name }];
    }));

    app.innerHTML = `
        <div class="page-head">
            <h1>Pokémon Types</h1>

            <p>
                Explore type strengths,
                weaknesses and Pokémon
                belonging to each type.
            </p>
        </div>

        <div class="type-grid">
            ${TYPES.map(type => `
                <article
                    class="type-card"
                    data-type="${type}"
                    style="--type-color:${COLORS[type]}"
                >
                    <img class="type-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${representatives[type].id}.png" alt="${representatives[type].name ? cap(displayPokemonName(representatives[type].name)) : cap(type) + ' Pokémon'}" width="120" height="120" loading="lazy">
                    <h3>${cap(type)}</h3>
                </article>
            `).join('')}
        </div>
    `;

    document
        .querySelectorAll('.type-card')
        .forEach(cardElement => {
            cardElement.onclick = () => {
                showType(
                    cardElement.dataset.type
                );
            };
        });
}

async function showType(name) {
    app.innerHTML = `
        <div class="loading">
            Loading type…
        </div>
    `;

    const data = await json(
        `/api/pokemon/type/${name}`
    );

    const relations =
        data.damage_relations;

    const pokemon = data.pokemon
        .map(entry => {
            const id = Number(
                entry.pokemon.url
                    .match(/\/(\d+)\/$/)[1]
            );

            return list.find(pokemon => pokemon.id === id) || {
                id,
                name: entry.pokemon.name
            };
        })
        .filter(pokemon => {
            return list.some(entry => entry.id === pokemon.id);
        });

    const featuredPokemon = pokemon.length
        ? pokemon[Math.floor(Math.random() * pokemon.length)]
        : null;

    app.innerHTML = `
        <button
            class="back"
            onclick="navigate('types')"
        >
            ‹ Back to Types
        </button>

        <section
            class="profile"
            style="--accent:${COLORS[name]}"
        >
            <div>

                <h1>${cap(name)} Type</h1>

                <p>
                    Explore ${cap(name)}-type Pokémon
                    and their offensive and defensive
                    matchups.
                </p>
            </div>
            ${featuredPokemon ? `
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${featuredPokemon.id}.png"
                    alt="${cap(displayPokemonName(featuredPokemon.name))}"
                    loading="eager"
                >
            ` : ''}
        </section>

        <div class="details-grid">
            <section class="panel">
                <h2>Weak To</h2>

                ${relations.double_damage_from
            .map(type => badge(type.name))
            .join('') ||
        'None'
        }
            </section>

            <section class="panel">
                <h2>Resists</h2>

                ${relations.half_damage_from
            .map(type => badge(type.name))
            .join('') ||
        'None'
        }
            </section>

            <section class="panel wide">
                <h2>
                    Super Effective Against
                </h2>

                ${relations.double_damage_to
            .map(type => badge(type.name))
            .join('') ||
        'None'
        }
            </section>
        </div>

        <section>
            <div class="section-title">
                <h2>${cap(name)} Pokémon</h2>
            </div>

            <div class="grid">
                ${pokemon
            .map(item =>
                card(item, [name])
            )
            .join('')}
            </div>
        </section>
    `;

    bindCards();
}


/* =========================================================
   MY POKÉMON
   ========================================================= */

function renderFavorites() {
    current = 'favorites';

    activeNav();

    favs = readFavs();

    updateFavCount();

    if (!favs.length) {
        app.innerHTML = `
            <div class="page-head">
                <h1>My Pokémon</h1>

                <p>
                    Your saved Pokémon collection.
                </p>
            </div>

            <div class="empty">
                <h2>No Pokémon saved yet.</h2>

                <p>
                    Explore the Pokédex and tap
                    the pokeball to save your favorites.
                </p>

                <button id="explorePokemon">
                    Explore Pokémon
                </button>
            </div>
        `;

        document
            .querySelector('#explorePokemon')
            ?.addEventListener(
                'click',
                () => navigate('pokedex')
            );

        return;
    }

    const saved = favs.map(id => {
        const known = list.find(
            pokemon =>
                Number(pokemon.id) ===
                Number(id)
        );

        return known || {
            id: Number(id),
            name: `Pokémon #${id}`,
            image:
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        };
    });

    app.innerHTML = `
        <div class="page-head">
            <h1>My Pokémon</h1>

            <p>
                ${saved.length} saved Pokémon
            </p>
        </div>

        <div class="grid">
            ${saved
            .map(pokemon => card(pokemon))
            .join('')}
        </div>
    `;

    bindCards();
}


/* =========================================================
   PROFILE MEDIA
   ========================================================= */

function setupProfileMedia() {
    const wrapper =
        document.querySelector(
            '.profile-cinematic'
        );

    if (!wrapper) {
        return;
    }

    const video =
        wrapper.querySelector(
            '.profile-battle-video'
        );

    const fallback =
        wrapper.querySelector(
            '.profile-cinematic-fallback'
        );

    if (!video) {
        return;
    }

    let completed = false;

    const useVideo = () => {
        if (completed) {
            return;
        }

        completed = true;

        wrapper.classList.add(
            'has-video'
        );

        video.classList.add(
            'is-ready'
        );

        fallback?.classList.add(
            'is-hidden'
        );
    };

    const useFallback = () => {
        if (completed) {
            return;
        }

        completed = true;

        video.classList.add(
            'is-hidden'
        );

        fallback?.classList.add(
            'is-ready'
        );
    };

    video.addEventListener(
        'canplay',
        useVideo,
        { once: true }
    );

    video.addEventListener(
        'playing',
        useVideo,
        { once: true }
    );

    video.addEventListener(
        'error',
        useFallback,
        { once: true }
    );

    setTimeout(() => {
        if (
            !completed &&
            video.readyState < 3
        ) {
            useFallback();
        }
    }, 1800);
}


/* =========================================================
   POKÉMON DETAILS
   ========================================================= */

async function showDetail(id) {
    app.innerHTML = `
        <div class="loading">
            Loading Pokémon…
        </div>
    `;

    let data, foodData;
    try {
        [data, foodData] = await Promise.all([getFull(id), getPokemonFoodData()]);
    } catch (error) {

        console.error('Unable to load Pokémon details:', error);
        app.innerHTML = `
            <section class="panel wide">
                <h2>Pokémon could not be loaded</h2>
                <p>Please try again in a moment.</p>
                <button class="button" onclick="showDetail(${JSON.stringify(id)})">Retry</button>
                <button class="button" onclick="navigate('pokedex')">Back to Pokédex</button>
            </section>
        `;
        return;
    }

    const pokemon = data.pokemon;
    const species = data.species;
    const foodFormName = pokemon.name.replace(/-mega(?:-[a-z]+)?$/i, '');
    const legendsFood = foodData.legendsArceus?.[foodFormName] ||
        foodData.legendsArceus?.[species.name] || null;
    const generationKey = species.generation?.name;
    const generationLabel = GENERATION_NAMES[generationKey] || 'Unknown Generation';
    const formRegion = pokemon.name.match(/-(alola|galar|hisui|paldea)(?:-|$)/i)?.[1];
    const regionLabel = formRegion
        ? cap(formRegion)
        : REGION_NAMES[generationKey] || 'Unknown Region';
    const abilities = await Promise.all((pokemon.abilities || []).map(async slot => {
        const abilityName = slot.ability.name;
        const serverDescription = data.abilities?.find(
            ability => ability.name === abilityName
        )?.description;
        let description = serverDescription;

        if (!description || /unavailable/i.test(description)) {
            try {
                description = await getAbilityDescription(slot.ability.url);
            } catch (error) {
                console.warn(`Unable to load ${abilityName} description:`, error);
                description = 'Ability description unavailable.';
            }
        }

        return {
            name: abilityName,
            is_hidden: slot.is_hidden,
            description
        };
    }));

    const types = data.types.map(
        type => type.name
    );

    const modernDexVersions = [
        'scarlet-violet',
        'legends-arceus',
        'sword-shield',
        'brilliant-diamond-shining-pearl',
        'ultra-sun-ultra-moon',
        'sun-moon'
    ];
    const englishSpeciesName = species.names?.find(entry => entry.language.name === 'en')?.name ||
        cap(displayPokemonName(pokemon.name));
    const funFact = (species.flavor_text_entries || [])
        .filter(entry => entry.language.name === 'en')
        .map(entry => ({
            text: entry.flavor_text.replace(/[\n\f]/g, ' ').replace(/\s+/g, ' ').trim(),
            version: entry.version?.name || ''
        }))
        .filter(entry => entry.text)
        .sort((left, right) => {
            const rank = version => {
                const index = modernDexVersions.indexOf(version);
                return index < 0 ? modernDexVersions.length : index;
            };
            return rank(left.version) - rank(right.version);
        });

    const uniqueFunFacts = [...new Map(funFact.map(entry => [entry.text, entry])).values()];
    const selectedFunFact = uniqueFunFacts[0]?.text || '';
    const normalizedFunFact = /^[^a-z]*[A-Z][A-ZÀ-ÖØ-Þ\s'’,.!?;:()\-]*$/.test(selectedFunFact)
        ? selectedFunFact.toLocaleLowerCase().replace(/^([^a-z]*)([a-z])/, (_, prefix, letter) => prefix + letter.toLocaleUpperCase())
        : selectedFunFact;
    const pokemonFunFact = normalizedFunFact
        ? normalizedFunFact.replace(
            new RegExp(englishSpeciesName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
            englishSpeciesName
        )
        : `There's always something new to discover about ${englishSpeciesName}!`;

    const weaknesses = [
        ...new Set(
            data.types.flatMap(type =>
                type.relations.double_damage_from
                    .map(item => item.name)
            )
        )
    ];

    const resistances = [
        ...new Set(
            data.types.flatMap(type =>
                type.relations.half_damage_from
                    .map(item => item.name)
            )
        )
    ];

    const strengths = [
        ...new Set(
            data.types.flatMap(type =>
                type.relations.double_damage_to
                    .map(item => item.name)
            )
        )
    ];

    const evolutionChain = [];

    function walkEvolution(node) {
        const evolutionId = Number(
            node.species.url
                .match(/\/(\d+)\/$/)[1]
        );

        evolutionChain.push({
            id: evolutionId,
            name: node.species.name,
            detail:
                node.evolution_details?.[0]
        });

        (
            node.evolves_to ||
            []
        ).forEach(walkEvolution);
    }

    if (data.evolution?.chain) {
        walkEvolution(
            data.evolution.chain
        );
    }

    const alternateForms = (species.varieties || [])
        .filter(variant => !variant.is_default &&
            isMeaningfulPokemonForm(variant.pokemon?.name, species.name))
        .map(variant => ({
            id: Number(variant.pokemon.url.match(/\/(\d+)\/$/)?.[1]),
            name: variant.pokemon.name,
            label: meaningfulFormLabel(variant.pokemon.name, species.name)
        }))
        .filter(form => Number.isFinite(form.id))
        .filter((form, index, forms) =>
            forms.findIndex(candidate => candidate.name === form.name) === index);
    const currentFormLabel = pokemonFormLabel(pokemon.name, species.name);

    const officialArtwork = pokemon.sprites?.other?.['official-artwork'];
    const artwork = officialArtwork?.front_default || pokemon.sprites?.front_default;
    const shinyArtwork = officialArtwork?.front_shiny || pokemon.sprites?.front_shiny;

    const animatedSprite = artwork;
    const cryUrl = pokemon.cries?.latest ||
        `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;

    app.innerHTML = `
        <button
            class="back"
            onclick="navigate('pokedex')"
        >
            ‹ Back to Pokédex
        </button>

        <section class="profile pokemon-profile" style="--accent:${COLORS[types[0]]}">

             <button class="fact-cry" type="button" data-pokemon-cry="${cryUrl}" aria-label="Play ${cap(displayPokemonName(pokemon.name))}'s sound">

                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M11 5 6 9H3v6h3l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7m2.5-9.5a9 9 0 0 1 0 12" />
                </svg>

            </button>

            <div>
                <small>
                    #${String(species.id).padStart(4, '0')}
                </small>

                <h1>
                    ${englishSpeciesName}
                </h1>
                ${currentFormLabel ? `<p class="pokemon-form-label">${currentFormLabel}</p>` : ''}

                <span class="shiny-status" data-shiny-status role="status"></span>

                <div>
                    ${types
            .map(badge)
            .join('')}
                </div>

            <div class="pokemon-fun-fact">
                <p>
                    ${pokemonFunFact}
                </p>
            </div>

                <div class="facts">
                    <span>
                        <b>${pokemon.height / 10} m</b>
                        Height
                    </span>

                    <span>
                        <b>${pokemon.weight / 10} kg</b>
                        Weight
                    </span>

                    <span>
                        <b>
                            ${cap(
                (
                    species.genera ||
                    []
                ).find(
                    item =>
                        item.language.name ===
                        'en'
                )?.genus ||
                'Pokémon'
            )}
                        </b>

                        Species
                    </span>

                    <span>
                        <b>
                            ${cap(
                species.habitat?.name ||
                'Unknown'
            )}
                        </b>

                        Habitat
                    </span>

                    <span>
                        <b>${generationLabel}</b>
                        <small>${regionLabel}</small>
                    </span>

                </div>
            </div>

            <div
                class="profile-cinematic"
                aria-label="${cap(displayPokemonName(pokemon.name))} battle profile"
            >
                <video
                    class="profile-battle-video"
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    poster="${artwork}"
                >
                    <source
                        src="/media/battles/${pokemon.name}.webm"
                        type="video/webm"
                    >

                    <source
                        src="/media/battles/${pokemon.name}.mp4"
                        type="video/mp4"
                    >
                </video>

                <div class="profile-cinematic-fallback">
                    <img
                        class="profile-hd-backdrop"
                        src="${artwork}"
                        alt=""
                        aria-hidden="true"
                    >

                    <div class="profile-animation-stage">
                        <img
                            class="profile-clean-animation"
                            src="${animatedSprite}"
                            alt="${cap(displayPokemonName(pokemon.name))}"
                        >

                        <div class="profile-stage-glow"></div>
                    </div>
                </div>
            </div>

            <button
                class="profile-pokeball-button pokeball-button ${favs.includes(Number(species.id)) ? 'active' : ''}"
                data-profile-fav="${species.id}"
                type="button"
                style="--pokemon-color: ${COLORS[types[0]] || 'var(--red)'}"
                aria-pressed="${favs.includes(Number(species.id))}"
                aria-label="${favs.includes(Number(species.id)) ? 'Remove' : 'Add'} ${englishSpeciesName} ${favs.includes(Number(species.id)) ? 'from' : 'to'} My Pokémon">
                <span class="pokeball-icon"></span>
            </button>

            <button class="shiny-toggle" type="button" data-shiny-toggle
                    aria-label="${shinyArtwork ? 'Show shiny' : 'Shiny unavailable'}"
                    title="${shinyArtwork ? 'Show shiny' : 'Shiny unavailable'}"
                    aria-pressed="false" ${shinyArtwork ? '' : 'disabled'}>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="m10 3 2.5 6.5L19 12l-6.5 2.5L10 21l-2.5-6.5L1 12l6.5-2.5Z" />
                    <path d="m19 1 1.1 2.9L23 5l-2.9 1.1L19 9l-1.1-2.9L15 5l2.9-1.1Z" />
                </svg>
            </button>

        </section>

        <div class="details-grid">

            <!-- BASE STATS -->

            <section class="panel">
                <h2>Base Stats</h2>

                ${pokemon.stats.map(stat => `
                    <div class="stat">
                        <span>
                            ${stat.stat.name === 'hp' ? 'HP' : cap(stat.stat.name)}
                        </span>

                        <i>
                            <b
                                style="
                                    width:
                                    ${Math.min(
                100,
                stat.base_stat / 1.5
            )}%
                                "
                            ></b>
                        </i>

                        <strong>
                            ${stat.base_stat}
                        </strong>
                    </div>
                `).join('')}
            </section>

            <!-- ABILITIES -->

            <section class="panel">
                <h2>Abilities</h2>

                ${abilities.map(ability => `
                    <div class="ability">
                        <div>
                            <b>${cap(ability.name)}</b>
                            ${ability.is_hidden ? '<small>Hidden Ability</small>' : ''}
                            <p>${ability.description}</p>
                        </div>
                    </div>
                `).join('')}
                ${renderSignatureZMove(pokemon)}
            </section>

            <!-- TYPE MATCHUP -->

            ${weaknesses.length || resistances.length || strengths.length ? `
                <section class="panel wide">
                    <h2>Type Matchup</h2>

                    ${weaknesses.length ? `
                        <div class="match">
                            <b>Weak Against</b>
                            <div>${weaknesses.map(badge).join('')}</div>
                        </div>
                    ` : ''}

                    ${resistances.length ? `
                        <div class="match">
                            <b>Resistant To</b>
                            <div>${resistances.map(badge).join('')}</div>
                        </div>
                    ` : ''}

                    ${strengths.length ? `
                        <div class="match">
                            <b>Offensively Strong Against</b>
                            <div>${strengths.map(badge).join('')}</div>
                        </div>
                    ` : ''}
                </section>
            ` : ''}

            ${legendsFood ? `
                <section class="panel wide">
                    <h2>Food Preferences</h2>
                    <div class="food-preferences">
                        <div class="food-preference">
                            <b>Liked Foods</b>
                            <div class="food-chips">
                                ${legendsFood.foods?.map(foodImageChip).join('') || ''}
                            </div>
                        </div>
                    </div>
                    <p class="panel-note food-sources">
                        Pokémon Legends: Arceus food preferences.
                        <a href="https://www.serebii.net/legendsarceus/likedfood.shtml" target="_blank" rel="noreferrer">Legends: Arceus food list</a>
                    </p>
                </section>
            ` : ''}

            <!-- EVOLUTION -->

            <section class="panel wide">
                <h2>
                    Evolution Chain & Requirements
                </h2>

                <div class="evo">
                    ${evolutionChain.map(
                (evolution, index) => `
                            ${index
                        ? '<span class="arrow">→</span>'
                        : ''
                    }

                            <div
                                class="evo-step"
                                data-evo="${evolution.id}"
                            >
                                <img
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png"
                                    alt="${cap(evolution.name)}"
                                >

                                <b>
                                    ${cap(evolution.name)}
                                </b>

                                ${evolution.detail
                        ?.item
                        ?.name
                        ? ``
                        : ''
                    }

                                <em>
                                    ${evolutionText(
                        evolution.detail
                    )}
                                </em>
                            </div>
                        `
            ).join('')}
                </div>
            </section>

            ${alternateForms.length ? `
                <section class="panel wide alternate-forms-section">
                    <h2>Alternate Forms</h2>
                    <p class="panel-note">Choose a form to view its artwork and details.</p>
                    <div class="alternate-form-grid" role="group" aria-label="${englishSpeciesName} forms">
                        ${alternateForms.map(form => `
                            <button class="alternate-form-card" type="button" data-form-id="${form.id}"
                                aria-pressed="${form.name === pokemon.name}"
                                aria-label="Show ${englishSpeciesName} — ${form.label}">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${form.id}.png"
                                    onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.id}.png'"
                                    alt="" loading="lazy" width="112" height="112">
                                <span>${form.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- BATTLE ITEMS -->

            <section class="panel wide">
                <h2>
                    Suggested Battle Items
                </h2>

                <p class="panel-note">
                    General suggestions based on this
                    Pokémon’s base stats and primary type.
                    The best held item can vary by moveset,
                    format, ability and team.
                </p>

                <div class="item-grid">
                    ${recommendedItems(pokemon)
            .map(
                ([key, name, description]) => `
                                <article class="item-card">
                                    <img
                                        src="${itemIcon(key)}"
                                        alt=""
                                    >

                                    <div>
                                        <b>${name}</b>

                                        <p>
                                            ${description}
                                        </p>
                                    </div>
                                </article>
                            `
            )
            .join('')}
                </div>
            </section>

        </div>
    `;

    setupCarousels();
    rememberViewedPokemon(pokemon, species);
    setupProfileMedia();

    app.querySelectorAll('[data-form-id]').forEach(formButton => {
        formButton.addEventListener('click', () => showDetail(Number(formButton.dataset.formId)));
    });

    const shinyButton = app.querySelector('[data-shiny-toggle]');
    const profileMedia = app.querySelector('.profile-cinematic');
    const profileImage = profileMedia.querySelector('.profile-clean-animation');
    const backdrop = profileMedia.querySelector('.profile-hd-backdrop');
    const profileVideo = profileMedia.querySelector('video');
    let showingShiny = false;
    let shinySoundPending = false;

    const playLoadedShinySound = () => {
        if (!shinySoundPending || !showingShiny || !profileImage.isConnected ||
            !profileImage.complete || !profileImage.naturalWidth ||
            profileImage.currentSrc !== shinyArtwork ||
            shinyAudioContext?.state !== 'running' || !shinySoundBuffer) return;
        shinySoundPending = false;
        playShinySound();
    };

    profileImage.addEventListener('load', playLoadedShinySound);

    const updateAppearance = () => {
        const image = showingShiny ? shinyArtwork : artwork;
        profileImage.src = image;
        backdrop.src = image;
        profileImage.alt = `${showingShiny ? 'Shiny ' : ''}${cap(displayPokemonName(pokemon.name))}`;
        profileMedia.classList.toggle('is-shiny', showingShiny);
        shinyButton.setAttribute('aria-pressed', String(showingShiny));
        shinyButton.title = showingShiny ? 'Show normal' : 'Show shiny';
        shinyButton.setAttribute('aria-label', shinyButton.title);
        if (showingShiny) {
            profileVideo?.pause();
        } else if (profileVideo?.classList.contains('is-ready')) {
            profileVideo.play().catch(() => { });
        }
    };

    shinyButton.addEventListener('click', () => {
        if (!shinyArtwork || shinyButton.disabled) return;
        showingShiny = !showingShiny;
        shinySoundPending = showingShiny;
        if (showingShiny) prepareShinySound()?.then(playLoadedShinySound);
        updateAppearance();
        if (showingShiny) requestAnimationFrame(playLoadedShinySound);
    });

    profileImage.addEventListener('error', () => {
        if (!showingShiny) return;
        shinySoundPending = false;
        showingShiny = false;
        updateAppearance();
        shinyButton.disabled = true;
        shinyButton.title = 'Shiny unavailable';
        shinyButton.setAttribute('aria-label', shinyButton.title);
        app.querySelector('[data-shiny-status]').textContent = 'The shiny image could not be loaded.';
    });

    const cryButton = app.querySelector('[data-pokemon-cry]');
    if (cryButton) {
        let cryAudio;
        cryButton.addEventListener('click', async () => {
            if (cryAudio) {
                cryAudio.pause();
                cryAudio.currentTime = 0;
            }

            cryAudio = new Audio(cryButton.dataset.pokemonCry);
            cryButton.classList.add('is-playing');
            cryButton.setAttribute('aria-label', `Playing ${cap(displayPokemonName(pokemon.name))}'s sound`);
            cryAudio.addEventListener('ended', () => {
                cryButton.classList.remove('is-playing');
                cryButton.setAttribute('aria-label', `Play ${cap(displayPokemonName(pokemon.name))}'s sound`);
            }, { once: true });
            cryAudio.addEventListener('error', () => {
                cryButton.classList.remove('is-playing');
                cryButton.setAttribute('aria-label', `Play ${cap(displayPokemonName(pokemon.name))}'s sound`);
            }, { once: true });

            try {
                await cryAudio.play();
            } catch (error) {
                console.warn('Unable to play Pokémon sound:', error);
                cryButton.classList.remove('is-playing');
                cryButton.setAttribute('aria-label', `Play ${cap(displayPokemonName(pokemon.name))}'s sound`);
            }
        });
    }

    const profilePokeball =
        document.querySelector(
            '[data-profile-fav]'
        );

    if (profilePokeball) {
        const pokemonId = Number(
            profilePokeball.dataset.profileFav
        );

        updatePokeballState(
            profilePokeball,
            pokemonId
        );

        profilePokeball.onclick = event => {
            event.stopPropagation();

            toggleFav(pokemonId);

            updatePokeballState(
                profilePokeball,
                pokemonId
            );
        };
    }

    document
        .querySelectorAll('[data-evo]')
        .forEach(element => {
            element.onclick = () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showDetail(
                    element.dataset.evo
                );
            };
        });
}


/* =========================================================
   TRAINERS & CHAMPIONS
   ========================================================= */

const TRAINER_PORTRAITS = {
    'Blue': 'blue', 'Lance': 'lance', 'Steven Stone': 'steven',
    'Wallace': 'wallace', 'Cynthia': 'cynthia', 'Alder': 'alder',
    'Iris': 'iris', 'Diantha': 'diantha', 'Professor Kukui': 'kukui',
    'Leon': 'leon', 'Geeta': 'geeta', 'Ash Ketchum': 'ash',
    'Liko': 'liko', 'Roy': 'roy', 'Dot': 'dot'
};

const TRAINERS = [

    // Ash's companions and Team Rocket; teams are scoped to the listed series.
    {
        name: "Misty",
        portrait: "misty",
        title: "Cerulean Gym Leader",
        region: "Kanto",
        era: "Anime",
        series: "Original Series — Kanto",
        source: "Anime",
        game: "Kanto team",
        team: [120, 54, 175],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Misty_(anime)"
    },

    {
        name: "Brock",
        portrait: "brock",
        title: "Pokémon Breeder",
        region: "Kanto",
        era: "Anime",
        series: "Original Series — Kanto",
        source: "Anime",
        game: "Kanto team",
        team: [95, 74, 37],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Brock_(anime)"
    },

    {
        name: "Brock",
        portrait: "brock",
        title: "Pokémon Breeder",
        region: "Sinnoh",
        era: "Anime",
        series: "Diamond & Pearl",
        source: "Anime",
        game: "Sinnoh team",
        team: [185, 453, 440],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Brock_(anime)"
    },

    {
        name: "May",
        portrait: "may",
        title: "Pokémon Coordinator",
        region: "Hoenn",
        era: "Anime",
        series: "Advanced Generation",
        source: "Anime",
        game: "Hoenn team",
        team: [257, 267, 300, 446],
        reference: "https://bulbapedia.bulbagarden.net/wiki/May_(anime)"
    },

    {
        name: "Dawn",
        portrait: "dawn",
        title: "Pokémon Coordinator",
        region: "Sinnoh",
        era: "Anime",
        series: "Diamond & Pearl",
        source: "Anime",
        game: "Sinnoh team",
        team: [393, 427, 417, 473, 155, 468],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Dawn_(anime)"
    },

    {
        name: "Iris",
        portrait: "iris-anime",
        title: "Dragon Trainer",
        region: "Unova",
        era: "Anime",
        series: "Black & White",
        source: "Anime",
        game: "Unova team",
        team: [610, 530, 587, 149],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Iris_(anime)"
    },

    {
        name: "Cilan",
        portrait: "cilan",
        title: "Pokémon Connoisseur",
        region: "Unova",
        era: "Anime",
        series: "Black & White",
        source: "Anime",
        game: "Unova team",
        team: [511, 558, 618],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Cilan_(anime)"
    },

    {
        name: "Serena",
        portrait: "serena",
        title: "Pokémon Performer",
        region: "Kalos",
        era: "Anime",
        series: "XY",
        source: "Anime",
        game: "Kalos team",
        team: [654, 674, 700],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Serena_(anime)"
    },

    {
        name: "Clemont",
        portrait: "clemont",
        title: "Lumiose Gym Leader",
        region: "Kalos",
        era: "Anime",
        series: "XY",
        source: "Anime",
        game: "Kalos team",
        team: [659, 650, 405],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Clemont_(anime)"
    },

    {
        name: "Bonnie",
        portrait: "bonnie",
        title: "Aspiring Pokémon Trainer",
        region: "Kalos",
        era: "Anime",
        series: "XY",
        source: "Anime",
        game: "Kalos team",
        team: [702],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Bonnie_(anime)"
    },

    {
        name: "Lillie",
        portrait: "lillie",
        title: "Pokémon School Student",
        region: "Alola",
        era: "Anime",
        series: "Sun & Moon",
        source: "Anime",
        game: "Alola team",
        team: [10103],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Lillie_(anime)",
        teamNames: { "10103": "Alolan Vulpix" }
    },

    {
        name: "Lana",
        portrait: "lana",
        title: "Pokémon School Student",
        region: "Alola",
        era: "Anime",
        series: "Sun & Moon",
        source: "Anime",
        game: "Alola team",
        team: [730, 133],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Lana_(anime)"
    },

    {
        name: "Mallow",
        portrait: "mallow",
        title: "Pokémon School Student",
        region: "Alola",
        era: "Anime",
        series: "Sun & Moon",
        source: "Anime",
        game: "Alola team",
        team: [763],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Mallow_(anime)"
    },

    {
        name: "Kiawe",
        portrait: "kiawe",
        title: "Pokémon School Student",
        region: "Alola",
        era: "Anime",
        series: "Sun & Moon",
        source: "Anime",
        game: "Alola team",
        team: [776, 10115, 6],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Kiawe_(anime)",
        teamNames: { "10115": "Alolan Marowak" }
    },

    {
        name: "Sophocles",
        portrait: "sophocles",
        title: "Pokémon School Student",
        region: "Alola",
        era: "Anime",
        series: "Sun & Moon",
        source: "Anime",
        game: "Alola team",
        team: [777, 738],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Sophocles_(anime)"
    },

    {
        name: "Goh",
        portrait: "goh",
        title: "Pokémon Research Fellow",
        region: "World",
        era: "Anime",
        series: "Journeys",
        source: "Anime",
        game: "Journeys team",
        team: [815, 818, 810],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Goh"
    },

    {
        name: "Chloe",
        portrait: "chloe",
        title: "Ash and Goh’s Friend",
        region: "Kanto",
        era: "Anime",
        series: "Journeys",
        source: "Anime",
        game: "Journeys team",
        team: [133],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Chloe"
    },

    {
        name: "Jessie",
        portrait: "jessie",
        title: "Team Rocket",
        region: "Kanto",
        era: "Anime",
        series: "Original Series — Kanto",
        source: "Anime",
        game: "Kanto team",
        team: [24, 108],
        reference: "https://bulbapedia.bulbagarden.net/wiki/Jessie"
    },

    {
        name: "James",
        portrait: "james",
        title: "Team Rocket",
        region: "Kanto",
        era: "Anime",
        series: "Original Series — Kanto",
        source: "Anime",
        game: "Kanto team",
        team: [110, 71],
        reference: "https://bulbapedia.bulbagarden.net/wiki/James"
    },

    // Main-series game Champions

    {
        name: 'Blue',
        title: 'Champion',
        region: 'Kanto',
        era: 'Games',
        series: 'Generation I',
        source: 'Game',
        game: 'Pokémon Red/Blue',
        team: [18, 65, 103, 130, 59, 6]
    },

    {
        name: 'Lance',
        title: 'Champion',
        region: 'Johto',
        era: 'Games',
        series: 'Generation II',
        source: 'Game',
        game: 'Pokémon Gold/Silver/Crystal',
        team: [130, 149, 149, 142, 6, 6]
    },

    {
        name: 'Steven Stone',
        title: 'Champion',
        region: 'Hoenn',
        era: 'Games',
        series: 'Generation III',
        source: 'Game',
        game: 'Pokémon Ruby/Sapphire',
        team: [227, 344, 346, 306, 82, 376]
    },

    {
        name: 'Wallace',
        title: 'Champion',
        region: 'Hoenn',
        era: 'Games',
        series: 'Generation III',
        source: 'Game',
        game: 'Pokémon Emerald',
        team: [321, 73, 272, 340, 130, 350]
    },

    {
        name: 'Cynthia',
        title: 'Champion',
        region: 'Sinnoh',
        era: 'Games',
        series: 'Generation IV',
        source: 'Game',
        game: 'Pokémon Diamond/Pearl',
        team: [442, 407, 423, 448, 350, 445]
    },

    {
        name: 'Alder',
        title: 'Champion',
        region: 'Unova',
        era: 'Games',
        series: 'Generation V',
        source: 'Game',
        game: 'Pokémon Black/White',
        team: [617, 626, 584, 621, 589, 637]
    },

    {
        name: 'Iris',
        title: 'Champion',
        region: 'Unova',
        era: 'Games',
        series: 'Generation V',
        source: 'Game',
        game: 'Pokémon Black 2/White 2',
        team: [635, 621, 567, 584, 306, 612]
    },

    {
        name: 'Diantha',
        title: 'Champion',
        region: 'Kalos',
        era: 'Games',
        series: 'Generation VI',
        source: 'Game',
        game: 'Pokémon X/Y',
        team: [701, 697, 699, 711, 706, 282]
    },

    {
        name: 'Professor Kukui',
        title: 'League Champion Battle',
        region: 'Alola',
        era: 'Games',
        series: 'Generation VII',
        source: 'Game',
        game: 'Pokémon Sun/Moon',
        team: [745, 628, 462, 143, 38, 730]
    },

    {
        name: 'Leon',
        title: 'Champion',
        region: 'Galar',
        era: 'Games',
        series: 'Generation VIII',
        source: 'Game',
        game: 'Pokémon Sword/Shield',
        team: [681, 612, 464, 812, 818, 6]
    },

    {
        name: 'Geeta',
        title: 'Top Champion',
        region: 'Paldea',
        era: 'Games',
        series: 'Generation IX',
        source: 'Game',
        game: 'Pokémon Scarlet/Violet',
        team: [956, 673, 998, 976, 954, 970]
    },


    // Anime eras — major protagonist teams

    {
        name: 'Ash Ketchum',
        title: 'Trainer',
        region: 'Kanto',
        era: 'Anime',
        series: 'Original Series — Kanto',
        source: 'Anime',
        game: 'Kanto team',
        team: [
            25,
            12,
            18,
            1,
            6,
            7,
            99,
            57,
            89,
            128,
            131,
            143
        ]
    },

    {
        name: 'Ash Ketchum',
        title: 'Trainer',
        region: 'Johto',
        era: 'Anime',
        series: 'Original Series — Johto',
        source: 'Anime',
        game: 'Johto team',
        team: [
            25,
            214,
            153,
            156,
            158,
            164,
            232
        ]
    },

    {
        name: 'Ash Ketchum',
        title: 'Trainer',
        region: 'Hoenn',
        era: 'Anime',
        series: 'Advanced Generation',
        source: 'Anime',
        game: 'Hoenn team',
        team: [
            25,
            277,
            254,
            341,
            324,
            362,
            190
        ]
    },

    {
        name: 'Ash Ketchum',
        title: 'Trainer',
        region: 'Sinnoh',
        era: 'Anime',
        series: 'Diamond & Pearl',
        source: 'Anime',
        game: 'Sinnoh team',
        team: [
            25,
            398,
            389,
            392,
            418,
            472,
            443
        ]
    },

    {
        name: 'Ash Ketchum',
        title: 'Trainer',
        region: 'Unova',
        era: 'Anime',
        series: 'Black & White',
        source: 'Anime',
        game: 'Unova team',
        team: [
            25,
            521,
            501,
            499,
            495,
            559,
            542,
            536,
            525,
            553
        ]
    },

    {
        name: 'Ash Ketchum',
        title: 'Trainer',
        region: 'Kalos',
        era: 'Anime',
        series: 'XY',
        source: 'Anime',
        game: 'Kalos team',
        team: [
            25,
            658,
            663,
            701,
            706,
            715
        ]
    },

    {
        name: 'Ash Ketchum',
        title: 'Alola League Champion',
        region: 'Alola',
        era: 'Anime',
        series: 'Sun & Moon',
        source: 'Anime',
        game: 'Alola team',
        team: [
            25,
            722,
            727,
            745,
            804,
            809
        ]
    },

    {
        name: 'Ash Ketchum',
        title: 'World Champion',
        region: 'World',
        era: 'Anime',
        series: 'Journeys',
        source: 'Anime',
        game: 'World Coronation Series team',
        team: [
            25,
            149,
            94,
            448,
            865,
            882
        ]
    },

    {
        name: 'Liko',
        title: 'Rising Volt Tacklers',
        region: 'Paldea',
        era: 'Anime',
        series: 'Horizons',
        source: 'Anime',
        game: 'Horizons team',
        team: [906, 907, 908]
    },

    {
        name: 'Roy',
        title: 'Rising Volt Tacklers',
        region: 'Paldea',
        era: 'Anime',
        series: 'Horizons',
        source: 'Anime',
        game: 'Horizons team',
        team: [909, 910, 911]
    },

    {
        name: 'Dot',
        title: 'Rising Volt Tacklers',
        region: 'Paldea',
        era: 'Anime',
        series: 'Horizons',
        source: 'Anime',
        game: 'Horizons team',
        team: [912, 913, 914]
    }
];


/* =========================================================
   TRAINERS PAGE
   ========================================================= */

const TRAINER_SERIES_OPTIONS = [...new Set(TRAINERS.map(trainer => trainer.series))];

function trainersPage() {
    current = 'trainers';

    activeNav();

    const eras = [
        'all',
        'Anime',
        'Games'
    ];

    app.innerHTML = `
        <div class="page-head">
            <h1>Trainers & Champions</h1>

            <p>
                Explore Ash's companions, Team Rocket,
                and main-series Champions with their Pokémon teams.
                Each trainer appears once with their combined Pokémon.
            </p>
        </div>

        <div class="trainer-tabs">
            ${eras.map(era => `
                <button
                    data-era="${era}"
                    class="${era === 'all' ? 'selected' : ''}"
                >
                    ${era === 'all' ? 'All' : era}
                </button>
            `).join('')}
        </div>

        <div class="toolbar">
            <div class="search">
                    <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <circle cx="10.5" cy="10.5" r="7.5" />
                        <path d="m16 16 5 5" />
                    </svg>

                <input
                    id="trainerQ"
                    placeholder="Search trainer, series, region or Pokémon"
                >
            </div>

            <select id="trainerSeries">
                <option value="all">
                    All Series / Generations
                </option>

                ${TRAINER_SERIES_OPTIONS.map(series => `
                    <option>${series}</option>
                `).join('')}
            </select>
        </div>

        <div class="trainer-note">
            Pokémon teams can change within an anime
            series, episode, game version or rematch.
            Select a series to see Pokémon from that series only.
        </div>

        <div
            id="trainerResults"
            class="trainer-grid"
        ></div>
        <p class="trainer-art-credit">
            Character artwork &copy; The Pok&eacute;mon Company / Nintendo / GAME FREAK.
            Images via <a href="https://www.pokepedia.fr/" target="_blank" rel="noopener noreferrer">Pok&eacute;p&eacute;dia</a>.
        </p>
    `;

    document
        .querySelectorAll('[data-era]')
        .forEach(button => {
            button.onclick = () => {
                document
                    .querySelectorAll('[data-era]')
                    .forEach(item => {
                        item.classList.remove(
                            'selected'
                        );
                    });

                button.classList.add(
                    'selected'
                );

                renderTrainers();
            };
        });

    document
        .querySelector('#trainerQ')
        .addEventListener(
            'input',
            renderTrainers
        );

    document
        .querySelector('#trainerSeries')
        .addEventListener(
            'change',
            renderTrainers
        );

    renderTrainers();
}

function mergeTrainerEntries(entries) {
    const groups = new Map();
    const orderedEntries = [...entries].sort((a, b) =>
        TRAINER_SERIES_OPTIONS.indexOf(a.series) - TRAINER_SERIES_OPTIONS.indexOf(b.series)
    );
    for (const trainer of orderedEntries) {
        const key = trainer.name.trim().toLowerCase();
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(trainer);
    }

    return [...groups.values()].map(group => {
        const merged = {
            ...group[0],
            team: [...new Set(group.flatMap(trainer => trainer.team))],
            teamNames: Object.assign({}, ...group.map(trainer => trainer.teamNames || {}))
        };
        for (const field of ['source', 'series', 'region', 'title', 'game']) {
            merged[field] = [...new Set(group.map(trainer => trainer[field]).filter(Boolean))].join(' / ');
        }
        return merged;
    });
}

function renderTrainers() {
    const search =
        (
            document
                .querySelector('#trainerQ')
                ?.value ||
            ''
        ).toLowerCase();

    const series =
        document
            .querySelector('#trainerSeries')
            ?.value ||
        'all';

    const era =
        document
            .querySelector(
                '[data-era].selected'
            )
            ?.dataset.era ||
        'all';

    const trainers =
        mergeTrainerEntries(TRAINERS.filter(trainer => {
            const matchesEra =
                era === 'all' ||
                trainer.era === era;

            const matchesSeries =
                series === 'all' ||
                trainer.series === series;

            const pokemonNames =
                trainer.team
                    .map(id => {
                        return (
                            list.find(
                                pokemon =>
                                    pokemon.id === id
                            )?.name || trainer.teamNames?.[id] ||
                            ''
                        );
                    })
                    .join(' ');

            const searchableText = `
                ${trainer.name}
                ${trainer.title}
                ${trainer.region}
                ${trainer.series}
                ${trainer.game}
                ${pokemonNames}
            `.toLowerCase();

            return (
                matchesEra &&
                matchesSeries &&
                searchableText.includes(search)
            );
        }));

    const results =
        document.querySelector(
            '#trainerResults'
        );

    if (!trainers.length) {
        results.innerHTML = `
            <div class="empty">
                <h2>No trainers found</h2>

                <p>
                    Try another series or search.
                </p>
            </div>
        `;

        return;
    }

    results.innerHTML =
        trainers.map(trainer => {
            return `
                <article class="trainer-card">

                    <div class="trainer-head">
                        <div class="trainer-portrait">
                            <span aria-hidden="true">${trainer.name.split(' ').map(part => part[0]).join('')}</span>
                            <img
                                src="images/trainers/${trainer.portrait || TRAINER_PORTRAITS[trainer.name]}.png"
                                alt="${trainer.name}"
                                width="96"
                                height="128"
                                loading="lazy"
                                decoding="async"
                                onerror="this.hidden = true"
                            >
                        </div>
                        <div>
                            <small>
                                ${trainer.source}
                                ·
                                ${trainer.series}
                                ·
                                ${trainer.region}
                            </small>

                            <h2>
                                ${trainer.name}
                            </h2>

                            <b class="trainer-title">
                                ${trainer.title}
                            </b>

                        </div>
                    </div>

                    <div class="trainer-team">
                        ${trainer.team.map(id => {
                const pokemon =
                    list.find(
                        item =>
                            item.id === id
                    ) || {
                        id,
                        name: trainer.teamNames?.[id] || 'pokemon'
                    };

                return `
                                <button
                                    data-trainer-pokemon="${id}"
                                    title="${cap(displayPokemonName(pokemon.name))}"
                                >
                                    <img
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
                                        alt="${cap(displayPokemonName(pokemon.name))}"
                                    >

                                    <span>
                                        ${cap(displayPokemonName(pokemon.name))}
                                    </span>
                                </button>
                            `;
            }).join('')}
                    </div>

                </article>
            `;
        }).join('');

    document
        .querySelectorAll(
            '[data-trainer-pokemon]'
        )
        .forEach(button => {
            button.onclick = () => {
                showDetail(
                    button.dataset.trainerPokemon
                );
            };
        });
}


/* =========================================================
   START APPLICATION
   ========================================================= */

init().catch(error => {
    console.error(error);

    if (current !== 'favorites') {
        app.innerHTML = `
            <div class="empty">
                <h2>Could not load Pokédex</h2>

                <p>${error.message}</p>
            </div>
        `;
    }
});
