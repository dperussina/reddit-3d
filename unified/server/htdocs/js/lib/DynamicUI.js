/*
 * Rob Weaver && William Miller && Dan Perussina
 *  2012
 */

var UIStyle = function(color, font, background) {
	// Color
	if (color) {
		this.color = color;
	}
	// Set default Color
	else {
		color = null;
	}

	// Font
	if (font) {
		this.font = font;
	}
	// Set default font
	else {
		this.font = null;
	}

	// Background Image
	if (background) {
		this.background = background;
	}
	// Set default Image
	else {
		this.background = null;
	}
};

var DynamicUI = function() {
	this.width = 0;
	this.height = 0;

	this.style = new UIStyle();

	this.UIDrag = null;
};

DynamicUI.prototype.init = function(divId, width, height, style) {

	var availableTags = ['30ROCK', '3DS', '49ers', '4chan', 'aaaaaatheismmmmmmmmmm', 'AbandonedPorn', 'AcademicPhilosophy', 'active', 'actuallesbians', 'AdPorn', 'AdrenalinePorn', 'AdvancedFitness', 'adventuretime', 'AdviceAnimals', 'AdviceAtheists', 'AFL', 'aggies', 'ainbow', 'airsoft', 'AlbumArtPorn', 'AlienBlue', 'AlisonBrie', 'alternativeart', 'AMA', 'Amateur', 'AmateurArchives', 'amazondeals', 'AmISexy', 'amiugly', 'anal', 'analogygifs', 'Anarchism', 'Anarcho_Capitalism', 'Android', 'androidapps', 'androiddev', 'androidthemes', 'AnimalPorn', 'animation', 'anime', 'announcements', 'anonymous', 'answers', 'Anthropology', 'Anticonsumption', 'AntiJokes', 'Anxiety', 'AnythingGoesNews', 'AnythingGoesNSFW', 'AnythingGoesPics', 'AppHookup', 'apple', 'Aquariums', 'Archaeology', 'ArcherFX', 'architecture', 'ArchitecturePorn', 'archlinux', 'arduino', 'arresteddevelopment', 'Art', 'ArtisanVideos', 'ArtPorn', 'AsianHotties', 'AskCulinary', 'AskEngineers', 'AskHistorians', 'AskMen', 'AskReddit', 'askscience', 'askseddit', 'AskSocialScience', 'AskWomen', 'asmr', 'asoiaf', 'ass', 'assassinscreed', 'asshole', 'Assistance', 'asstastic', 'Astronomy', 'atheism', 'Atlanta', 'audioengineering', 'audiophile', 'Austin', 'australia', 'Autos', 'Avengers', 'aves', 'aviation', 'awesome', 'aww', 'awwnime', 'Awww', 'awwwtf', 'BabyBumps', 'backpacking', 'Bacon', 'Bad_Cop_No_Donut', 'badcompany2', 'Baking', 'baseball', 'Bass', 'batman', 'battlefield3', 'battlestations', 'bayarea', 'BBQ', 'BBW', 'bdsm', 'BDSMcommunity', 'BDSMGW', 'beach', 'beadsprites', 'BeardPorn', 'beards', 'beatles', 'beer', 'beermoney', 'beerporn', 'bestof', 'beyondthebump', 'bicycling', 'bigbangtheory', 'BiGoneMild', 'bikesgonewild', 'bikinis', 'bimbofetish', 'bindingofisaac', 'biology', 'Bioshock', 'birdpics', 'birdswitharms', 'bisexual', 'Bitcoin', 'bjj', 'blackops2', 'bleachshirts', 'Blink182', 'blog', 'Blowjobs', 'BMW', 'boardgames', 'BoardwalkEmpire', 'bodybuilding', 'bodyweightfitness', 'boltedontits', 'Bondage', 'boobbounce', 'Boobies', 'bookclub', 'bookporn', 'books', 'booksuggestions', 'Borderlands', 'Borderlands2', 'boston', 'BostonTerrier', 'BotanicalPorn', 'Bottomless_Vixens', 'Boxer', 'Braveryjerk', 'Braves', 'breakingbad', 'brisbane', 'britishproblems', 'BritishTV', 'brokengifs', 'BSG', 'BTFC', 'Buddhism', 'budgetfood', 'buffy', 'buildapc', 'buildapcsales', 'Bulldogs', 'burstingout', 'business', 'BuyItForLife', 'C25K', 'cablefail', 'cableporn', 'Calgary', 'California', 'calvinandhobbes', 'camping', 'CampingandHiking', 'camwhores', 'canada', 'CanadaPolitics', 'cannabis', 'carcrash', 'carlhprogramming', 'carporn', 'cars', 'casualiama', 'catpictures', 'cats', 'Celebs', 'cerebral', 'CFB', 'Chargers', 'Cheap_Meals', 'chelseafc', 'chemicalreactiongifs', 'chemistry', 'chess', 'CHIBears', 'chicago', 'childfree', 'ChristianGirls', 'Christianity', 'chrome', 'chubby', 'cigars', 'cincinnati', 'Cinemagraphs', 'circlebroke', 'circlebroke2', 'circlejerk', 'CityPorn', 'civ', 'Civcraft', 'CivcraftExchange', 'classic4chan', 'classicalmusic', 'classicrage', 'climbing', 'ClopClop', 'coding', 'Coffee', 'CoffeeWithJesus', 'cogsci', 'ColbertRally', 'collapse', 'CollegeAmateurs', 'CollegeBasketball', 'collegesluts', 'Colorado', 'comeonandslam', 'comicbooks', 'comics', 'commandline', 'community', 'compsci', 'computing', 'confession', 'Conservative', 'conspiracy', 'conspiratard', 'Cooking', 'cordcutters', 'corgi', 'cosplay', 'cosplaygirls', 'coupons', 'coversongs', 'coys', 'cpp', 'crafts', 'craigslist', 'CrappyDesign', 'creampies', 'CreepShots', 'creepy', 'creepyPMs', 'Cricket', 'cringe', 'cripplingalcoholism', 'crochet', 'crossdressing', 'crossfit', 'Cuckold', 'Cumberbitches', 'cumfetish', 'cumsluts', 'curiosityrover', 'curvy', 'cyberlaws', 'Cyberpunk', 'Dachshund', 'daddit', 'DAE', 'dailyprogrammer', 'Dallas', 'darknetplan', 'darksouls', 'dataisbeautiful', 'datfeel', 'datgap', 'dating_advice', 'dayz', 'dbz', 'DCcomics', 'de', 'deadpool', 'DealsReddit', 'DebateReligion', 'defaultgems', 'Demotivational', 'Denmark', 'Denver', 'depression', 'DepthHub', 'Design', 'DesignPorn', 'DessertPorn', 'DestructionPorn', 'Dexter', 'Diablo', 'diablo3', 'Diablo3Strategy', 'dirndls', 'DirtyGaming', 'dirtypenpals', 'dirtysmall', 'discgolf', 'disney', 'DIY', 'DJs', 'DnB', 'DnD', 'doctorwho', 'DoctorWhumour', 'Documentaries', 'Dodgers', 'DoesAnybodyElse', 'Dogfort', 'dogpictures', 'dogs', 'dolan', 'DotA2', 'downblouse', 'drawing', 'Drugs', 'drums', 'drunk', 'dubstep', 'DunderMifflin', 'dwarffortress', 'dykesgonemild', 'dykesgonewild', 'EA_FIFA', 'eagles', 'EarthPorn', 'eatsandwiches', 'eCards', 'ecchi', 'ECE', 'Economics', 'economy', 'EDC', 'edmproduction', 'education', 'EFLcomics', 'eldertrees', 'electrohouse', 'electronic_cigarette', 'electronicmusic', 'electronics', 'EmmaStone', 'EmmaWatson', 'ems', 'EndlessWar', 'energy', 'engineering', 'EngineeringStudents', 'Enhancement', 'entertainment', 'Entrepreneur', 'environment', 'Equality', 'europe', 'Eve', 'everymanshouldknow', 'evolution', 'evolutionReddit', 'exmormon', 'exmuslim', 'ExpectationVsReality', 'ExplainLikeImCalvin', 'explainlikeimfive', 'explainlikeimjive', 'ExposurePorn', 'eyes', 'facebookwins', 'facedownassup', 'facepalm', 'FacialFun', 'falcons', 'Fallout', 'familyguy', 'FancyFollicles', 'Fantasy', 'fantasyfootball', 'FanTheories', 'fashion', 'Favors', 'FearMe', 'feet', 'femalefashionadvice', 'femalepov', 'Feminism', 'feminisms', 'fffffffuuuuuuuuuuuu', 'fffffffuuuuuuuuuuuud', 'fia', 'FIFA', 'FifthWorldPics', 'fifthworldproblems', 'Filmmakers', 'FinalFantasy', 'finance', 'financialindependence', 'Firearms', 'firefly', 'firefox', 'FirePorn', 'firstworldanarchists', 'firstworldproblems', 'Fishing', 'fitmeals', 'Fitness', 'fitnesscirclejerk', 'FixedGearBicycle', 'food', 'Foodforthought', 'FoodPorn', 'ForeverAlone', 'ForeverAloneWomen', 'forhire', 'formula1', 'Forts', 'freebies', 'FreeKarma', 'Freethought', 'fringe', 'Frisson', 'Frugal', 'frugalmalefashion', 'ftlgame', 'funny', 'furry', 'futurama', 'futurebeats', 'futureporn', 'Futurology', 'gaaaaaaayyyyyyyyyyyy', 'gadgets', 'gainit', 'gallifrey', 'gamecollecting', 'GameDeals', 'gamedev', 'gamegrumps', 'gamemusic', 'gameofthrones', 'GameofTrolls2', 'gamernews', 'Games', 'gameswap', 'gaming', 'gamingnews', 'gamingpc', 'gardening', 'GaryJohnson', 'gay', 'gaybears', 'gaybros', 'GaybrosGoneWild', 'gaymers', 'GaymersGoneMild', 'gaymersgonewild', 'geek', 'GeekPorn', 'gentlemanboners', 'geology', 'geologyporn', 'germanshepherds', 'germany', 'GetMotivated', 'ggggg', 'gif', 'gifs', 'GifSound', 'ginger', 'GirlGamers', 'girlsdoingnerdythings', 'GirlsFinishingTheJob', 'girlsflashing', 'GirlsinStripedSocks', 'girlsinyogapants', 'girlskissing', 'GirlswithGlasses', 'GirlswithNeonHair', 'glassheads', 'Glitch_in_the_Matrix', 'GlobalOffensive', 'goldenretrievers', 'golf', 'gonenatural', 'gonewild', 'gonewildaudio', 'gonewildcurvy', 'gonewildflicks', 'GoneWildPlus', 'gonewildstories', 'GoneWildTube', 'google', 'googleplus', 'Gore', 'government', 'Graffiti', 'GrandTheftAutoV', 'graphic_design', 'gravityfalls', 'Green', 'GreenBayPackers', 'greenday', 'grool', 'grumpycats', 'GTA', 'Guildwars2', 'guildwars2funny', 'guineapigs', 'Guitar', 'guitarlessons', 'Gunners', 'GunPorn', 'guns', 'hackers', 'hacking', 'HairyPussy', 'HalfLife', 'halloween', 'halo', 'happy', 'HappyEmbarrassedGirls', 'happygaps', 'happygirls', 'hardbodies', 'hardscience', 'hardware', 'harrypotter', 'haskell', 'hawkthorne', 'Health', 'Heavymind', 'hentai', 'HeroesofNewerth', 'heteroflexible', 'HIFW', 'HighHeels', 'HighResNSFW', 'HIMYM', 'hiphopheads', 'HIPSTERGURLZ', 'HistoricalWhatIf', 'history', 'HistoryPorn', 'HITsWorthTurkingFor', 'hockey', 'Homebrewing', 'homeland', 'homemadexxx', 'homestead', 'homestuck', 'hookah', 'horror', 'HorseMask', 'Horses', 'Hotchickswithtattoos', 'hotties', 'House', 'houston', 'howto', 'howtonotgiveafuck', 'hugeboobs', 'HumanPorn', 'humor', 'Hungergames', 'Hunting', 'IAmA', 'IASIP', 'IDAP', 'ifyoulikeblank', 'iiiiiiitttttttttttt', 'illusionporn', 'Images', 'ImaginaryCharacters', 'ImaginaryLandscapes', 'ImaginaryMonsters', 'ImaginaryTechnology', 'ImGoingToHellForThis', 'incest', 'indepthstories', 'india', 'IndianBabes', 'IndieGaming', 'InfrastructurePorn', 'Inglip', 'InsightfulQuestions', 'InteriorDesign', 'introvert', 'investing', 'ipad', 'iphone', 'ireland', 'islam', 'Israel', 'itookapicture', 'IWantOut', 'IWantToLearn', 'jailbreak', 'japan', 'java', 'javascript', 'Jazz', 'Jeep', 'jobs', 'JoeRogan', 'Jokes', 'journeytolife', 'juicyasians', 'JusticePorn', 'Justrolledintotheshop', 'Kappa', 'KarmaConspiracy', 'katawashoujo', 'kateupton', 'KerbalSpaceProgram', 'keto', 'kindle', 'KingdomHearts', 'knitting', 'knives', 'kpics', 'kpop', 'LadyBoners', 'Ladybonersgonecuddly', 'ladybonersgw', 'ladyladyboners', 'languagelearning', 'law', 'LawSchool', 'leagueoflegends', 'LeagueOfMemes', 'leangains', 'learnart', 'LearnJapanese', 'learnmath', 'Learnmusic', 'learnprogramming', 'LearnUselessTalents', 'lectures', 'LegalTeens', 'lego', 'lesbians', 'LetsNotMeet', 'lgbt', 'Liberal', 'Libertarian', 'lifehacks', 'LifeProTips', 'lingerie', 'linguistics', 'linux', 'linux_gaming', 'linux4noobs', 'listentothis', 'lists', 'literature', 'LiverpoolFC', 'lockpicking', 'lol', 'lolcats', 'LoLFanArt', 'london', 'longboarding', 'LongDistance', 'lookatmydog', 'LosAngeles', 'loseit', 'lost', 'lostgeneration', 'lotr', 'Lovecraft', 'lovegaymale', 'LucidDreaming', 'ludology', 'LV426', 'mac', 'MachineLearning', 'MachinePorn', 'MacroPorn', 'madmen', 'magicskyfairy', 'magicTCG', 'MakeupAddiction', 'malefashionadvice', 'malegrooming', 'malehairadvice', 'malelifestyle', 'manga', 'mangonewild', 'MapPorn', 'marchingband', 'Marijuana', 'marketing', 'Marvel', 'mashups', 'masseffect', 'MassiveCock', 'math', 'MCPE', 'mcservers', 'medicine', 'Meditation', 'meetup', 'melbourne', 'meme', 'memes', 'MensRights', 'metacirclejerk', 'Metal', 'Metalcore', 'metalgearsolid', 'MetalMemes', 'metart', 'mexico', 'mflb', 'mfw', 'Michigan', 'microgrowery', 'microsoft', 'MilaKunis', 'mildlyinfuriating', 'mildlyinteresting', 'milf', 'Military', 'MilitaryPorn', 'mindcrack', 'Minecraft', 'Minecraft360', 'MinecraftInventions', 'minecraftsuggestions', 'minerapocalypse', 'MineZ', 'minimalism', 'minnesotavikings', 'misc', 'MLPdrawingschool', 'MLPLounge', 'MLS', 'MMA', 'moderatepolitics', 'Modern_Family', 'modnews', 'Mommit', 'montreal', 'Mooning', 'MorbidReality', 'motorcycles', 'movieclub', 'moviecritic', 'MoviePosterPorn', 'movies', 'Moviesinthemaking', 'MTB', 'MURICA', 'Muse', 'museum', 'Music', 'musictheory', 'mw3', 'mylittlealcoholic', 'mylittlehuman', 'mylittlepony', 'mythbusters', 'Naruto', 'nasa', 'nature', 'nba', 'needadvice', 'neopets', 'nerdfighters', 'netflix', 'NetflixBestOf', 'netsec', 'networking', 'neuro', 'neurophilosophy', 'NeutralPolitics', 'newjersey', 'newreddits', 'news', 'NewsPorn', 'newzealand', 'nextdoorasians', 'Nexus7', 'nfffffffluuuuuuuuuuuu', 'nfl', 'NigelThornberry', 'niggers', 'nintendo', 'Nipples', 'nocontext', 'NoFap', 'nofapgonewild', 'nongolfers', 'Nootropics', 'nosleep', 'nostalgia', 'notinteresting', 'NotSafeForNature', 'nottheonion', 'nsfw', 'NSFW_GIF', 'nsfw_gifs', 'NSFW_nospam', 'NSFW_Wallpapers', 'nsfw_wtf', 'nsfw2', 'NSFWFunny', 'nsfwhardcore', 'nsfwoutfits', 'nsfwvideos', 'nude', 'nursing', 'nutrition', 'nyc', 'NYGiants', 'O_Faces', 'obama', 'occupywallstreet', 'offbeat', 'Offensive_Wallpapers', 'offmychest', 'OFWGKTA', 'Ohlympics', 'OkCupid', 'OldSchoolCool', 'oliviawilde', 'olympics', 'OnePiece', 'onetruegod', 'OneY', 'onions', 'OnOff', 'opendirectories', 'opensource', 'orioles', 'osx', 'ottawa', 'Outdoors', 'palegirls', 'Paleo', 'PandR', 'Pantyfetish', 'paradoxplaza', 'Paranormal', 'Pareidolia', 'Parenting', 'parrots', 'passionx', 'patientgamers', 'Patriots', 'pcgaming', 'Pee', 'penis', 'PenmanshipPorn', 'PennStateUniversity', 'PerfectBabes', 'PerfectTiming', 'Permaculture', 'personalfinance', 'Pets', 'pewdiepie', 'philadelphia', 'philosophy', 'PhilosophyofScience', 'phish', 'Photobucketplunder', 'photocritique', 'photography', 'photoplunder', 'photoshop', 'photoshopbattles', 'PHP', 'Physics', 'piano', 'picrequests', 'pics', 'Pictures', 'picturesofiansleeping', 'Pieces', 'piercing', 'pinkfloyd', 'PipeTobacco', 'Piracy', 'pitbulls', 'Pizza', 'Planetside', 'Playdate', 'playitforward', 'PocketWhales', 'Poetry', 'Pokeents', 'pokemon', 'pokemonconspiracies', 'PokePorn', 'poker', 'polandball', 'POLITIC', 'PoliticalDiscussion', 'PoliticalHumor', 'politics', 'polyamory', 'popping', 'poppunkers', 'porn', 'porn_gifs', 'pornography', 'pornvids', 'Portal', 'Portland', 'PostCollapse', 'PostHardcore', 'postrock', 'PrettyGirls', 'privacy', 'productivity', 'progmetal', 'programming', 'progressive', 'progresspics', 'ProjectEnrichment', 'ProjectReddit', 'promos', 'PropagandaPosters', 'proper', 'PS3', 'psychology', 'Psychonaut', 'PublicFlashing', 'pug', 'pugs', 'punk', 'Punny', 'Purdue', 'pussy', 'Pyongyang', 'Python', 'Quebec', 'quotes', 'QuotesPorn', 'r4r', 'Rabbits', 'radiohead', 'radioreddit', 'ragecomics', 'ragenovels', 'Rainmeter', 'Random_Acts_Of_Amazon', 'Random_Acts_Of_Pizza', 'RandomActsOfPolish', 'RandomKindness', 'randomsexiness', 'raspberry_pi', 'Rateme', 'RATS', 'reactiongifs', 'realasians', 'realdubstep', 'RealGirls', 'recipes', 'reddevils', 'reddit.com', 'RedditDayOf', 'RedditLaqueristas', 'reddits', 'redditstories', 'RedditThroughHistory', 'redheads', 'Redskins', 'regularshow', 'relationship_advice', 'relationships', 'religion', 'RenewableEnergy', 'reportthespammers', 'Republican', 'ReverseEngineering', 'rit', 'robotics', 'RomeSweetRome', 'ronpaul', 'RoomPorn', 'roosterteeth', 'RotMG', 'rpg', 'rpg_gamers', 'ruby', 'rugbyunion', 'rule34', 'runescape', 'running', 'sailing', 'Saints', 'sandiego', 'sanfrancisco', 'ScarlettJohansson', 'SceneGirls', 'Scholar', 'science', 'scifi', 'Scotch', 'screenshots', 'Screenwriting', 'Scrubs', 'Seahawks', 'Seattle', 'secretsanta', 'seduction', 'see', 'seinfeld', 'self', 'selfhelp', 'SelfSufficiency', 'sex', 'SexPositive', 'Sexy', 'SexyButNotPorn', 'SFGiants', 'SFM', 'Sherlock', 'SHHHHHEEEEEEEEIIIITT', 'ShinyPokemon', 'ShinyPorn', 'ShitRedditSays', 'Shitty_Watercolour', 'shittyadvice', 'shittyadviceanimals', 'shittyaskscience', 'shittybattlestations', 'shittyfoodporn', 'ShittyLifeProTips', 'shittyreactiongifs', 'shorthairedhotties', 'shortscarystories', 'ShouldIbuythisgame', 'showerbeer', 'shutupandtakemymoney', 'simpleliving', 'sixwordstories', 'Ska', 'skateboarding', 'skeptic', 'SketchDaily', 'skiing', 'SkyPorn', 'skyrim', 'slackerrecipes', 'Slender_Man', 'SlenderMan', 'sloths', 'slowcooking', 'snackexchange', 'Sneakers', 'snowboarding', 'SNSD', 'soccer', 'SocialEngineering', 'socialism', 'socialskills', 'sociology', 'software', 'somethingimade', 'Sonsofanarchy', 'SOPA', 'southpark', 'space', 'spacedicks', 'spaceporn', 'SpecArt', 'spiders', 'SpideyMeme', 'spongebob', 'sports', 'SquaredCircle', 'SRDBroke', 'SRSWomen', 'Stacked', 'Stahp', 'StandUpComedy', 'standupshots', 'starcraft', 'Stargate', 'starlets', 'startrek', 'startups', 'StarWars', 'StateOfTheUnion', 'statistics', 'Steam', 'steamdeals', 'SteamGameSwap', 'steampunk', 'steelers', 'stencils', 'StLouis', 'stockings', 'StonerEngineering', 'StonerProTips', 'stopsmoking', 'subaru', 'SubredditDrama', 'subredditoftheday', 'subs', 'subscribers', 'suicidegirls', 'SuicideWatch', 'summonerschool', 'Supernatural', 'surfing', 'Survival', 'sweden', 'swoleacceptance', 'swtor', 'sysadmin', 'TalesFromRetail', 'talesfromtechsupport', 'tall', 'tattoo', 'tattoos', 'tea', 'TechNewsToday', 'technology', 'techsupport', 'techsupportgore', 'ted', 'tedtalks', 'teenagers', 'teenboobies', 'tekkit', 'television', 'Terraria', 'terriblefacebookmemes', 'Texans', 'texas', 'tf2', 'TF2fashionadvice', 'tf2trade', 'Tgirls', 'TheAgora', 'theeternalwar', 'TheFacebookDelusion', 'TheHobbit', 'TheLastAirbender', 'TheoryOfReddit', 'theredditor', 'TheSimpsons', 'thesims', 'TheStopGirl', 'Thetruthishere', 'thewalkingdead', 'TheWayWeWere', 'thick', 'ThriftStoreHauls', 'Thrifty', 'tifu', 'tightdresses', 'TightShorts', 'TimAndEric', 'tinycode', 'TinyHouses', 'TinyTits', 'tipofmytongue', 'TittyDrop', 'tldr', 'todayilearned', 'TomHardy', 'tomhiddleston', 'tonightsdinner', 'toosoon', 'TopGear', 'toplessamateurs', 'Torchlight', 'toronto', 'torrents', 'totalwar', 'trackers', 'trailerparkboys', 'trance', 'transgender', 'Transhuman', 'travel', 'treecomics', 'treemusic', 'trees', 'treesgonewild', 'Tribes', 'trippy', 'TrollingAnimals', 'TrollXChromosomes', 'TrueAskReddit', 'TrueAtheism', 'TrueBlood', 'TrueFilm', 'truegaming', 'TrueReddit', 'TrueTrueReddit', 'TwoXChromosomes', 'typography', 'Ubuntu', 'UFOs', 'UIUC', 'ukpolitics', 'Unashamed', 'unitedkingdom', 'UniversityofReddit', 'UpliftingNews', 'Upskirt', 'upvotegifs', 'urbanexploration', 'vancouver', 'vegan', 'vegetarian', 'VegRecipes', 'vertical', 'vexillology', 'video', 'videos', 'VillagePorn', 'vim', 'vinyl', 'vita', 'VolleyballGirls', 'voluptuous', 'wallpaper', 'wallpapers', 'Warhammer', 'washingtondc', 'Watches', 'waterporn', 'WeAreTheMusicMakers', 'web_design', 'webcomics', 'webdesign', 'webdev', 'WebGames', 'weightroom', 'Weird', 'whatisthisthing', 'whatsthisbug', 'whoselineisitanyway', 'wicked_edge', 'wifesharing', 'wiiu', 'WikiLeaks', 'wikipedia', 'windows', 'windowshots', 'windowsphone', 'wine', 'wisconsin', 'woahdude', 'women', 'WomenOfColor', 'woodworking', 'Wordpress', 'workaholics', 'worldbuilding', 'worldevents', 'worldnews', 'WorldofTanks', 'worldpolitics', 'worstof', 'wow', 'writing', 'WTF', 'WtSSTaDaMiT', 'xbox360', 'Xcom', 'xkcd', 'xxfitness', 'yiff', 'yoga', 'YouShouldKnow', 'youtubecomments', 'youtubehaiku', 'yugioh', 'zelda', 'zen', 'ZenHabits', 'zombies'];
	$("#users_choice").autocomplete({
		source : availableTags
	});

	// Set sytle objects
	if (style) {
		this.style = style;
	}

	this.width = width;
	this.height = height;

	this.UIDrag = Drag;
	//TODO: This fails when compiled
	//error: Uncaught TypeError: Cannot set property 'onmousedown' of null
	//stack :
	/*Drag.init super.min.js:653
	DynamicUI.init super.min.js:652
	RedditGL.init super.min.js:823
	(anonymous function) super.min.js:822
	m super.min.js:29
	n.fireWith super.min.js:30
	i.extend.ready super.min.js:20
	oa*/
	//removed for now
	this.UIDrag.init(document.getElementById(divId));
};

/**************************************************
 * dom-drag.js
 * 09.25.2001
 * www.youngpup.net
 * Script featured on Dynamic Drive (http://www.dynamicdrive.com) 12.08.2005
 **************************************************
 * 10.28.2001 - fixed minor bug where events
 * sometimes fired off the handle, not the root.
 **************************************************/

var Drag = {

	obj : null,

	init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper) {
		try{
			o.onmousedown = Drag.start;
		}catch(err){
			console.log("ERROR : "+ err);
			return;
		}
		

		o.hmode = bSwapHorzRef ? false : true;
		o.vmode = bSwapVertRef ? false : true;

		o.root = oRoot && oRoot != null ? oRoot : o;

		if (o.hmode && isNaN(parseInt(o.root.style.left)))
			o.root.style.left = "0px";
		if (o.vmode && isNaN(parseInt(o.root.style.top)))
			o.root.style.top = "0px";
		if (!o.hmode && isNaN(parseInt(o.root.style.right)))
			o.root.style.right = "0px";
		if (!o.vmode && isNaN(parseInt(o.root.style.bottom)))
			o.root.style.bottom = "0px";

		o.minX = typeof minX != 'undefined' ? minX : null;
		o.minY = typeof minY != 'undefined' ? minY : null;
		o.maxX = typeof maxX != 'undefined' ? maxX : null;
		o.maxY = typeof maxY != 'undefined' ? maxY : null;

		o.xMapper = fXMapper ? fXMapper : null;
		o.yMapper = fYMapper ? fYMapper : null;

		o.root.onDragStart = new Function();
		o.root.onDragEnd = new Function();
		o.root.onDrag = new Function();
	},

	start : function(e) {
		var o = Drag.obj = this;
		e = Drag.fixE(e);
		var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
		o.root.onDragStart(x, y);

		o.lastMouseX = e.clientX;
		o.lastMouseY = e.clientY;

		if (o.hmode) {
			if (o.minX != null)
				o.minMouseX = e.clientX - x + o.minX;
			if (o.maxX != null)
				o.maxMouseX = o.minMouseX + o.maxX - o.minX;
		} else {
			if (o.minX != null)
				o.maxMouseX = -o.minX + e.clientX + x;
			if (o.maxX != null)
				o.minMouseX = -o.maxX + e.clientX + x;
		}

		if (o.vmode) {
			if (o.minY != null)
				o.minMouseY = e.clientY - y + o.minY;
			if (o.maxY != null)
				o.maxMouseY = o.minMouseY + o.maxY - o.minY;
		} else {
			if (o.minY != null)
				o.maxMouseY = -o.minY + e.clientY + y;
			if (o.maxY != null)
				o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove = Drag.drag;
		document.onmouseup = Drag.end;

		return false;
	},

	drag : function(e) {
		e = Drag.fixE(e);
		var o = Drag.obj;

		var ey = e.clientY;
		var ex = e.clientX;
		var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
		var nx, ny;

		if (o.minX != null)
			ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
		if (o.maxX != null)
			ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
		if (o.minY != null)
			ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
		if (o.maxY != null)
			ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

		nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
		ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

		if (o.xMapper)
			nx = o.xMapper(y)
		else if (o.yMapper)
			ny = o.yMapper(x)

		Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
		Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
		Drag.obj.lastMouseX = ex;
		Drag.obj.lastMouseY = ey;

		Drag.obj.root.onDrag(nx, ny);
		return false;
	},

	end : function() {
		document.onmousemove = null;
		document.onmouseup = null;
		Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
		Drag.obj = null;
	},

	fixE : function(e) {
		if ( typeof e == 'undefined')
			e = window.event;
		if ( typeof e.layerX == 'undefined')
			e.layerX = e.offsetX;
		if ( typeof e.layerY == 'undefined')
			e.layerY = e.offsetY;
		return e;
	}
};
