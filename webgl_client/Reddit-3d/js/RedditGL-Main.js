
/*
 * Author(s): Daniel Perussina, William Miller, Rob Weaver
 * 2012 - Reddit3d, bitch
 */

var RedditMain;

document.subreddit = 'frontpage';
$(document).ready(function() {
	
	var availableTags = ['30ROCK', '3DS', '3DS', '49ers', '4chan', '4chan', 'aaaaaatheismmmmmmmmmm', 'aaaaaatheismmmmmmmmmm', 'AbandonedPorn', 'AbandonedPorn', 'AcademicPhilosophy', 'active', 'actuallesbians', 'actuallesbians', 'AdPorn', 'AdrenalinePorn', 'AdrenalinePorn', 'AdvancedFitness', 'adventuretime', 'adventuretime', 'AdviceAnimals', 'AdviceAnimals', 'AdviceAtheists', 'AFL', 'aggies', 'ainbow', 'ainbow', 'airsoft', 'AlbumArtPorn', 'AlbumArtPorn', 'AlienBlue', 'AlienBlue', 'AlisonBrie', 'alternativeart', 'alternativeart', 'AMA', 'AMA', 'Amateur', 'Amateur', 'AmateurArchives', 'AmateurArchives', 'amazondeals', 'amazondeals', 'AmISexy', 'AmISexy', 'amiugly', 'amiugly', 'anal', 'analogygifs', 'Anarchism', 'Anarchism', 'Anarcho_Capitalism', 'Anarcho_Capitalism', 'Android', 'Android', 'androidapps', 'androiddev', 'androidthemes', 'androidthemes', 'AnimalPorn', 'AnimalPorn', 'animation', 'anime', 'anime', 'announcements', 'anonymous', 'anonymous', 'answers', 'answers', 'Anthropology', 'Anticonsumption', 'AntiJokes', 'AntiJokes', 'Anxiety', 'Anxiety', 'AnythingGoesNews', 'AnythingGoesNews', 'AnythingGoesNSFW', 'AnythingGoesNSFW', 'AnythingGoesPics', 'AnythingGoesPics', 'AppHookup', 'apple', 'apple', 'Aquariums', 'Aquariums', 'Archaeology', 'ArcherFX', 'ArcherFX', 'architecture', 'architecture', 'ArchitecturePorn', 'ArchitecturePorn', 'archlinux', 'arduino', 'arresteddevelopment', 'arresteddevelopment', 'Art', 'Art', 'ArtisanVideos', 'ArtisanVideos', 'ArtPorn', 'AsianHotties', 'AsianHotties', 'AskCulinary', 'AskCulinary', 'AskEngineers', 'AskHistorians', 'AskHistorians', 'AskMen', 'AskMen', 'AskReddit', 'AskReddit', 'askscience', 'askscience', 'askseddit', 'AskSocialScience', 'AskWomen', 'AskWomen', 'asmr', 'asmr', 'asoiaf', 'asoiaf', 'ass', 'ass', 'assassinscreed', 'assassinscreed', 'asshole', 'Assistance', 'Assistance', 'asstastic', 'Astronomy', 'Astronomy', 'atheism', 'atheism', 'Atlanta', 'Atlanta', 'audioengineering', 'audioengineering', 'audiophile', 'Austin', 'Austin', 'australia', 'australia', 'Autos', 'Autos', 'Avengers', 'aves', 'aviation', 'aviation', 'awesome', 'awesome', 'aww', 'aww', 'awwnime', 'Awww', 'awwwtf', 'awwwtf', 'BabyBumps', 'backpacking', 'Bacon', 'Bacon', 'Bad_Cop_No_Donut', 'Bad_Cop_No_Donut', 'badcompany2', 'Baking', 'Baking', 'baseball', 'baseball', 'Bass', 'Bass', 'batman', 'batman', 'battlefield3', 'battlefield3', 'battlestations', 'battlestations', 'bayarea', 'bayarea', 'BBQ', 'BBW', 'bdsm', 'bdsm', 'BDSMcommunity', 'BDSMGW', 'BDSMGW', 'beach', 'beadsprites', 'BeardPorn', 'beards', 'beards', 'beatles', 'beatles', 'beer', 'beer', 'beermoney', 'beerporn', 'beerporn', 'bestof', 'bestof', 'beyondthebump', 'bicycling', 'bicycling', 'bigbangtheory', 'bigbangtheory', 'BiGoneMild', 'bikesgonewild', 'bikinis', 'bimbofetish', 'bindingofisaac', 'biology', 'biology', 'Bioshock', 'birdpics', 'birdswitharms', 'birdswitharms', 'bisexual', 'bisexual', 'Bitcoin', 'Bitcoin', 'bjj', 'bjj', 'blackops2', 'bleachshirts', 'bleachshirts', 'Blink182', 'blog', 'Blowjobs', 'Blowjobs', 'BMW', 'boardgames', 'boardgames', 'BoardwalkEmpire', 'bodybuilding', 'bodybuilding', 'bodyweightfitness', 'bodyweightfitness', 'boltedontits', 'boltedontits', 'Bondage', 'Bondage', 'boobbounce', 'Boobies', 'Boobies', 'bookclub', 'bookporn', 'bookporn', 'books', 'books', 'booksuggestions', 'Borderlands', 'Borderlands', 'Borderlands2', 'Borderlands2', 'boston', 'boston', 'BostonTerrier', 'BotanicalPorn', 'Bottomless_Vixens', 'Boxer', 'Braveryjerk', 'Braves', 'breakingbad', 'breakingbad', 'brisbane', 'britishproblems', 'britishproblems', 'BritishTV', 'BritishTV', 'brokengifs', 'BSG', 'BTFC', 'Buddhism', 'Buddhism', 'budgetfood', 'buffy', 'buildapc', 'buildapc', 'buildapcsales', 'Bulldogs', 'burstingout', 'burstingout', 'business', 'business', 'BuyItForLife', 'BuyItForLife', 'C25K', 'C25K', 'cablefail', 'cableporn', 'cableporn', 'Calgary', 'California', 'calvinandhobbes', 'calvinandhobbes', 'camping', 'CampingandHiking', 'CampingandHiking', 'camwhores', 'camwhores', 'canada', 'canada', 'CanadaPolitics', 'cannabis', 'carcrash', 'carlhprogramming', 'carporn', 'carporn', 'cars', 'cars', 'casualiama', 'casualiama', 'catpictures', 'catpictures', 'cats', 'cats', 'Celebs', 'Celebs', 'cerebral', 'CFB', 'CFB', 'Chargers', 'Cheap_Meals', 'chelseafc', 'chemicalreactiongifs', 'chemistry', 'chemistry', 'chess', 'CHIBears', 'chicago', 'chicago', 'childfree', 'childfree', 'ChristianGirls', 'ChristianGirls', 'Christianity', 'Christianity', 'chrome', 'chubby', 'cigars', 'cigars', 'cincinnati', 'Cinemagraphs', 'Cinemagraphs', 'circlebroke', 'circlebroke', 'circlebroke2', 'circlejerk', 'circlejerk', 'CityPorn', 'CityPorn', 'civ', 'civ', 'Civcraft', 'CivcraftExchange', 'classic4chan', 'classic4chan', 'classicalmusic', 'classicalmusic', 'classicrage', 'classicrage', 'climbing', 'climbing', 'ClopClop', 'coding', 'Coffee', 'Coffee', 'CoffeeWithJesus', 'cogsci', 'ColbertRally', 'collapse', 'collapse', 'CollegeAmateurs', 'CollegeBasketball', 'collegesluts', 'Colorado', 'comeonandslam', 'comicbooks', 'comicbooks', 'comics', 'comics', 'commandline', 'community', 'community', 'compsci', 'computing', 'confession', 'confession', 'Conservative', 'Conservative', 'conspiracy', 'conspiracy', 'conspiratard', 'conspiratard', 'Cooking', 'Cooking', 'cordcutters', 'cordcutters', 'corgi', 'corgi', 'cosplay', 'cosplay', 'cosplaygirls', 'cosplaygirls', 'coupons', 'coversongs', 'coys', 'cpp', 'crafts', 'crafts', 'craigslist', 'CrappyDesign', 'CrappyDesign', 'creampies', 'CreepShots', 'CreepShots', 'creepy', 'creepy', 'creepyPMs', 'creepyPMs', 'Cricket', 'cringe', 'cringe', 'cripplingalcoholism', 'cripplingalcoholism', 'crochet', 'crossdressing', 'crossfit', 'Cuckold', 'Cumberbitches', 'cumfetish', 'cumsluts', 'cumsluts', 'curiosityrover', 'curvy', 'curvy', 'cyberlaws', 'Cyberpunk', 'Cyberpunk', 'Dachshund', 'daddit', 'daddit', 'DAE', 'DAE', 'dailyprogrammer', 'Dallas', 'Dallas', 'darknetplan', 'darksouls', 'darksouls', 'dataisbeautiful', 'dataisbeautiful', 'datfeel', 'datgap', 'datgap', 'dating_advice', 'dayz', 'dayz', 'dbz', 'dbz', 'DCcomics', 'DCcomics', 'de', 'deadpool', 'DealsReddit', 'DebateReligion', 'DebateReligion', 'defaultgems', 'defaultgems', 'Demotivational', 'Demotivational', 'Denmark', 'Denver', 'Denver', 'depression', 'depression', 'DepthHub', 'DepthHub', 'Design', 'Design', 'DesignPorn', 'DessertPorn', 'DestructionPorn', 'DestructionPorn', 'Dexter', 'Dexter', 'Diablo', 'Diablo', 'diablo3', 'diablo3', 'Diablo3Strategy', 'dirndls', 'DirtyGaming', 'dirtypenpals', 'dirtysmall', 'dirtysmall', 'discgolf', 'discgolf', 'disney', 'disney', 'DIY', 'DIY', 'DJs', 'DnB', 'DnB', 'DnD', 'DnD', 'doctorwho', 'doctorwho', 'DoctorWhumour', 'Documentaries', 'Documentaries', 'Dodgers', 'DoesAnybodyElse', 'DoesAnybodyElse', 'Dogfort', 'dogpictures', 'dogpictures', 'dogs', 'dogs', 'dolan', 'dolan', 'DotA2', 'DotA2', 'downblouse', 'drawing', 'drawing', 'Drugs', 'Drugs', 'drums', 'drums', 'drunk', 'drunk', 'dubstep', 'dubstep', 'DunderMifflin', 'DunderMifflin', 'dwarffortress', 'dwarffortress', 'dykesgonemild', 'dykesgonewild', 'EA_FIFA', 'eagles', 'EarthPorn', 'EarthPorn', 'eatsandwiches', 'eatsandwiches', 'eCards', 'eCards', 'ecchi', 'ECE', 'Economics', 'Economics', 'economy', 'economy', 'EDC', 'EDC', 'edmproduction', 'education', 'EFLcomics', 'eldertrees', 'eldertrees', 'electrohouse', 'electrohouse', 'electronic_cigarette', 'electronicmusic', 'electronicmusic', 'electronics', 'electronics', 'EmmaStone', 'EmmaWatson', 'EmmaWatson', 'ems', 'EndlessWar', 'energy', 'energy', 'engineering', 'engineering', 'EngineeringStudents', 'EngineeringStudents', 'Enhancement', 'entertainment', 'entertainment', 'Entrepreneur', 'Entrepreneur', 'environment', 'environment', 'Equality', 'europe', 'europe', 'Eve', 'Eve', 'everymanshouldknow', 'evolution', 'evolutionReddit', 'exmormon', 'exmuslim', 'ExpectationVsReality', 'ExpectationVsReality', 'ExplainLikeImCalvin', 'explainlikeimfive', 'explainlikeimfive', 'explainlikeimjive', 'ExposurePorn', 'ExposurePorn', 'eyes', 'eyes', 'facebookwins', 'facedownassup', 'facedownassup', 'facepalm', 'facepalm', 'FacialFun', 'falcons', 'Fallout', 'Fallout', 'familyguy', 'FancyFollicles', 'FancyFollicles', 'Fantasy', 'Fantasy', 'fantasyfootball', 'fantasyfootball', 'FanTheories', 'FanTheories', 'fashion', 'Favors', 'FearMe', 'feet', 'femalefashionadvice', 'femalefashionadvice', 'femalepov', 'Feminism', 'Feminism', 'feminisms', 'feminisms', 'fffffffuuuuuuuuuuuu', 'fffffffuuuuuuuuuuuu', 'fffffffuuuuuuuuuuuud', 'fia', 'FIFA', 'FifthWorldPics', 'FifthWorldPics', 'fifthworldproblems', 'fifthworldproblems', 'Filmmakers', 'Filmmakers', 'FinalFantasy', 'FinalFantasy', 'finance', 'financialindependence', 'Firearms', 'firefly', 'firefly', 'firefox', 'FirePorn', 'firstworldanarchists', 'firstworldanarchists', 'firstworldproblems', 'firstworldproblems', 'Fishing', 'Fishing', 'fitmeals', 'Fitness', 'Fitness', 'fitnesscirclejerk', 'FixedGearBicycle', 'FixedGearBicycle', 'food', 'food', 'Foodforthought', 'Foodforthought', 'FoodPorn', 'FoodPorn', 'ForeverAlone', 'ForeverAlone', 'ForeverAloneWomen', 'forhire', 'forhire', 'formula1', 'formula1', 'Forts', 'freebies', 'freebies', 'FreeKarma', 'Freethought', 'Freethought', 'fringe', 'fringe', 'Frisson', 'Frisson', 'Frugal', 'Frugal', 'frugalmalefashion', 'frugalmalefashion', 'ftlgame', 'funny', 'funny', 'furry', 'futurama', 'futurama', 'futurebeats', 'futurebeats', 'futureporn', 'futureporn', 'Futurology', 'Futurology', 'gaaaaaaayyyyyyyyyyyy', 'gadgets', 'gadgets', 'gainit', 'gallifrey', 'gamecollecting', 'gamecollecting', 'GameDeals', 'GameDeals', 'gamedev', 'gamedev', 'gamegrumps', 'gamemusic', 'gamemusic', 'gameofthrones', 'gameofthrones', 'GameofTrolls2', 'gamernews', 'gamernews', 'Games', 'Games', 'gameswap', 'gaming', 'gaming', 'gamingnews', 'gamingpc', 'gardening', 'gardening', 'GaryJohnson', 'GaryJohnson', 'gay', 'gaybears', 'gaybros', 'gaybros', 'GaybrosGoneWild', 'gaymers', 'gaymers', 'GaymersGoneMild', 'gaymersgonewild', 'geek', 'geek', 'GeekPorn', 'gentlemanboners', 'gentlemanboners', 'geology', 'geology', 'geologyporn', 'germanshepherds', 'germany', 'GetMotivated', 'GetMotivated', 'ggggg', 'gif', 'gif', 'gifs', 'gifs', 'GifSound', 'GifSound', 'ginger', 'ginger', 'GirlGamers', 'GirlGamers', 'girlsdoingnerdythings', 'GirlsFinishingTheJob', 'girlsflashing', 'girlsflashing', 'GirlsinStripedSocks', 'girlsinyogapants', 'girlsinyogapants', 'girlskissing', 'GirlswithGlasses', 'GirlswithGlasses', 'GirlswithNeonHair', 'GirlswithNeonHair', 'glassheads', 'Glitch_in_the_Matrix', 'GlobalOffensive', 'GlobalOffensive', 'goldenretrievers', 'golf', 'golf', 'gonenatural', 'gonewild', 'gonewild', 'gonewildaudio', 'gonewildaudio', 'gonewildcurvy', 'gonewildcurvy', 'gonewildflicks', 'GoneWildPlus', 'GoneWildPlus', 'gonewildstories', 'gonewildstories', 'GoneWildTube', 'google', 'google', 'googleplus', 'Gore', 'Gore', 'government', 'Graffiti', 'Graffiti', 'GrandTheftAutoV', 'graphic_design', 'gravityfalls', 'Green', 'GreenBayPackers', 'greenday', 'grool', 'grool', 'grumpycats', 'GTA', 'Guildwars2', 'Guildwars2', 'guildwars2funny', 'guineapigs', 'Guitar', 'Guitar', 'guitarlessons', 'Gunners', 'Gunners', 'GunPorn', 'GunPorn', 'guns', 'guns', 'hackers', 'hacking', 'HairyPussy', 'HalfLife', 'halloween', 'halo', 'halo', 'happy', 'happy', 'HappyEmbarrassedGirls', 'happygaps', 'happygirls', 'happygirls', 'hardbodies', 'hardbodies', 'hardscience', 'hardware', 'hardware', 'harrypotter', 'harrypotter', 'haskell', 'hawkthorne', 'Health', 'Health', 'Heavymind', 'Heavymind', 'hentai', 'hentai', 'HeroesofNewerth', 'HeroesofNewerth', 'heteroflexible', 'HIFW', 'HIFW', 'HighHeels', 'HighHeels', 'HighResNSFW', 'HIMYM', 'HIMYM', 'hiphopheads', 'hiphopheads', 'HIPSTERGURLZ', 'HistoricalWhatIf', 'HistoricalWhatIf', 'history', 'history', 'HistoryPorn', 'HistoryPorn', 'HITsWorthTurkingFor', 'HITsWorthTurkingFor', 'hockey', 'hockey', 'Homebrewing', 'Homebrewing', 'homeland', 'homemadexxx', 'homestead', 'homestuck', 'hookah', 'horror', 'horror', 'HorseMask', 'Horses', 'Hotchickswithtattoos', 'Hotchickswithtattoos', 'hotties', 'hotties', 'House', 'houston', 'houston', 'howto', 'howto', 'howtonotgiveafuck', 'howtonotgiveafuck', 'hugeboobs', 'hugeboobs', 'HumanPorn', 'HumanPorn', 'humor', 'humor', 'Hungergames', 'Hungergames', 'Hunting', 'IAmA', 'IAmA', 'IASIP', 'IASIP', 'IDAP', 'IDAP', 'ifyoulikeblank', 'iiiiiiitttttttttttt', 'iiiiiiitttttttttttt', 'illusionporn', 'illusionporn', 'Images', 'Images', 'ImaginaryCharacters', 'ImaginaryLandscapes', 'ImaginaryLandscapes', 'ImaginaryMonsters', 'ImaginaryMonsters', 'ImaginaryTechnology', 'ImaginaryTechnology', 'ImGoingToHellForThis', 'ImGoingToHellForThis', 'incest', 'indepthstories', 'india', 'india', 'IndianBabes', 'IndianBabes', 'IndieGaming', 'IndieGaming', 'InfrastructurePorn', 'InfrastructurePorn', 'Inglip', 'InsightfulQuestions', 'InteriorDesign', 'InteriorDesign', 'introvert', 'introvert', 'investing', 'investing', 'ipad', 'ipad', 'iphone', 'iphone', 'ireland', 'ireland', 'islam', 'islam', 'Israel', 'Israel', 'itookapicture', 'itookapicture', 'IWantOut', 'IWantToLearn', 'IWantToLearn', 'jailbreak', 'jailbreak', 'japan', 'japan', 'java', 'javascript', 'Jazz', 'Jazz', 'Jeep', 'jobs', 'JoeRogan', 'Jokes', 'Jokes', 'journeytolife', 'juicyasians', 'JusticePorn', 'JusticePorn', 'Justrolledintotheshop', 'Kappa', 'KarmaConspiracy', 'KarmaConspiracy', 'katawashoujo', 'kateupton', 'KerbalSpaceProgram', 'KerbalSpaceProgram', 'keto', 'keto', 'kindle', 'kindle', 'KingdomHearts', 'knitting', 'knitting', 'knives', 'knives', 'kpics', 'kpop', 'kpop', 'LadyBoners', 'LadyBoners', 'Ladybonersgonecuddly', 'ladybonersgw', 'ladybonersgw', 'ladyladyboners', 'languagelearning', 'law', 'LawSchool', 'leagueoflegends', 'leagueoflegends', 'LeagueOfMemes', 'leangains', 'learnart', 'LearnJapanese', 'learnmath', 'Learnmusic', 'learnprogramming', 'learnprogramming', 'LearnUselessTalents', 'LearnUselessTalents', 'lectures', 'LegalTeens', 'LegalTeens', 'lego', 'lego', 'lesbians', 'lesbians', 'LetsNotMeet', 'LetsNotMeet', 'lgbt', 'lgbt', 'Liberal', 'Liberal', 'Libertarian', 'Libertarian', 'lifehacks', 'lifehacks', 'LifeProTips', 'LifeProTips', 'lingerie', 'linguistics', 'linguistics', 'linux', 'linux', 'linux_gaming', 'linux4noobs', 'listentothis', 'listentothis', 'lists', 'literature', 'LiverpoolFC', 'lockpicking', 'lol', 'lol', 'lolcats', 'lolcats', 'LoLFanArt', 'london', 'london', 'longboarding', 'longboarding', 'LongDistance', 'LongDistance', 'lookatmydog', 'LosAngeles', 'LosAngeles', 'loseit', 'loseit', 'lost', 'lost', 'lostgeneration', 'lotr', 'lotr', 'Lovecraft', 'lovegaymale', 'LucidDreaming', 'LucidDreaming', 'ludology', 'LV426', 'mac', 'mac', 'MachineLearning', 'MachinePorn', 'MachinePorn', 'MacroPorn', 'madmen', 'madmen', 'magicskyfairy', 'magicTCG', 'magicTCG', 'MakeupAddiction', 'MakeupAddiction', 'malefashionadvice', 'malefashionadvice', 'malegrooming', 'malehairadvice', 'malelifestyle', 'manga', 'manga', 'mangonewild', 'MapPorn', 'MapPorn', 'marchingband', 'Marijuana', 'Marijuana', 'marketing', 'Marvel', 'Marvel', 'mashups', 'mashups', 'masseffect', 'masseffect', 'MassiveCock', 'math', 'math', 'MCPE', 'mcservers', 'medicine', 'Meditation', 'Meditation', 'meetup', 'melbourne', 'meme', 'meme', 'memes', 'memes', 'MensRights', 'MensRights', 'metacirclejerk', 'Metal', 'Metal', 'Metalcore', 'metalgearsolid', 'MetalMemes', 'metart', 'metart', 'mexico', 'mexico', 'mflb', 'mfw', 'Michigan', 'microgrowery', 'microgrowery', 'microsoft', 'MilaKunis', 'mildlyinfuriating', 'mildlyinteresting', 'mildlyinteresting', 'milf', 'milf', 'Military', 'Military', 'MilitaryPorn', 'MilitaryPorn', 'mindcrack', 'mindcrack', 'Minecraft', 'Minecraft', 'Minecraft360', 'MinecraftInventions', 'minecraftsuggestions', 'minerapocalypse', 'MineZ', 'minimalism', 'minimalism', 'minnesotavikings', 'misc', 'misc', 'MLPdrawingschool', 'MLPLounge', 'MLS', 'MLS', 'MMA', 'MMA', 'moderatepolitics', 'Modern_Family', 'modnews', 'Mommit', 'montreal', 'montreal', 'Mooning', 'MorbidReality', 'MorbidReality', 'motorcycles', 'motorcycles', 'movieclub', 'moviecritic', 'MoviePosterPorn', 'MoviePosterPorn', 'movies', 'movies', 'Moviesinthemaking', 'MTB', 'MTB', 'MURICA', 'Muse', 'museum', 'museum', 'Music', 'Music', 'musictheory', 'mw3', 'mw3', 'mylittlealcoholic', 'mylittlehuman', 'mylittlepony', 'mylittlepony', 'mythbusters', 'Naruto', 'Naruto', 'nasa', 'nature', 'nba', 'nba', 'needadvice', 'neopets', 'nerdfighters', 'netflix', 'netflix', 'NetflixBestOf', 'NetflixBestOf', 'netsec', 'netsec', 'networking', 'neuro', 'neurophilosophy', 'NeutralPolitics', 'newjersey', 'newjersey', 'newreddits', 'newreddits', 'news', 'news', 'NewsPorn', 'newzealand', 'newzealand', 'nextdoorasians', 'nextdoorasians', 'Nexus7', 'Nexus7', 'nfffffffluuuuuuuuuuuu', 'nfl', 'nfl', 'NigelThornberry', 'NigelThornberry', 'niggers', 'nintendo', 'nintendo', 'Nipples', 'nocontext', 'nocontext', 'NoFap', 'NoFap', 'nofapgonewild', 'nongolfers', 'nongolfers', 'Nootropics', 'nosleep', 'nosleep', 'nostalgia', 'nostalgia', 'notinteresting', 'NotSafeForNature', 'nottheonion', 'nottheonion', 'nsfw', 'nsfw', 'NSFW_GIF', 'NSFW_GIF', 'nsfw_gifs', 'nsfw_gifs', 'NSFW_nospam', 'NSFW_Wallpapers', 'NSFW_Wallpapers', 'nsfw_wtf', 'nsfw2', 'NSFWFunny', 'NSFWFunny', 'nsfwhardcore', 'nsfwhardcore', 'nsfwoutfits', 'nsfwoutfits', 'nsfwvideos', 'nude', 'nursing', 'nutrition', 'nyc', 'nyc', 'NYGiants', 'O_Faces', 'O_Faces', 'obama', 'obama', 'occupywallstreet', 'occupywallstreet', 'offbeat', 'offbeat', 'Offensive_Wallpapers', 'offmychest', 'offmychest', 'OFWGKTA', 'OFWGKTA', 'Ohlympics', 'OkCupid', 'OkCupid', 'OldSchoolCool', 'OldSchoolCool', 'oliviawilde', 'olympics', 'OnePiece', 'OnePiece', 'onetruegod', 'onetruegod', 'OneY', 'OneY', 'onions', 'OnOff', 'OnOff', 'opendirectories', 'opensource', 'opensource', 'orioles', 'osx', 'ottawa', 'Outdoors', 'palegirls', 'palegirls', 'Paleo', 'Paleo', 'PandR', 'PandR', 'Pantyfetish', 'paradoxplaza', 'Paranormal', 'Paranormal', 'Pareidolia', 'Pareidolia', 'Parenting', 'Parenting', 'parrots', 'passionx', 'patientgamers', 'Patriots', 'pcgaming', 'Pee', 'penis', 'penis', 'PenmanshipPorn', 'PennStateUniversity', 'PerfectBabes', 'PerfectTiming', 'PerfectTiming', 'Permaculture', 'personalfinance', 'personalfinance', 'Pets', 'Pets', 'pewdiepie', 'philadelphia', 'philadelphia', 'philosophy', 'philosophy', 'PhilosophyofScience', 'phish', 'Photobucketplunder', 'photocritique', 'photocritique', 'photography', 'photography', 'photoplunder', 'photoshop', 'photoshopbattles', 'photoshopbattles', 'PHP', 'Physics', 'Physics', 'piano', 'piano', 'picrequests', 'pics', 'pics', 'Pictures', 'picturesofiansleeping', 'Pieces', 'piercing', 'pinkfloyd', 'PipeTobacco', 'Piracy', 'Piracy', 'pitbulls', 'Pizza', 'Planetside', 'Planetside', 'Playdate', 'playitforward', 'PocketWhales', 'Poetry', 'Pokeents', 'pokemon', 'pokemon', 'pokemonconspiracies', 'pokemonconspiracies', 'PokePorn', 'poker', 'poker', 'polandball', 'POLITIC', 'PoliticalDiscussion', 'PoliticalDiscussion', 'PoliticalHumor', 'PoliticalHumor', 'politics', 'politics', 'polyamory', 'polyamory', 'popping', 'popping', 'poppunkers', 'porn', 'porn', 'porn_gifs', 'pornography', 'pornography', 'pornvids', 'pornvids', 'Portal', 'Portal', 'Portland', 'Portland', 'PostCollapse', 'PostHardcore', 'postrock', 'PrettyGirls', 'PrettyGirls', 'privacy', 'productivity', 'progmetal', 'progmetal', 'programming', 'programming', 'progressive', 'progressive', 'progresspics', 'progresspics', 'ProjectEnrichment', 'ProjectReddit', 'promos', 'PropagandaPosters', 'PropagandaPosters', 'proper', 'proper', 'PS3', 'PS3', 'psychology', 'psychology', 'Psychonaut', 'Psychonaut', 'PublicFlashing', 'pug', 'pugs', 'punk', 'punk', 'Punny', 'Punny', 'Purdue', 'pussy', 'pussy', 'Pyongyang', 'Python', 'Quebec', 'quotes', 'quotes', 'QuotesPorn', 'QuotesPorn', 'r4r', 'r4r', 'Rabbits', 'radiohead', 'radiohead', 'radioreddit', 'ragecomics', 'ragecomics', 'ragenovels', 'ragenovels', 'Rainmeter', 'Rainmeter', 'Random_Acts_Of_Amazon', 'Random_Acts_Of_Pizza', 'Random_Acts_Of_Pizza', 'RandomActsOfPolish', 'RandomKindness', 'randomsexiness', 'randomsexiness', 'raspberry_pi', 'raspberry_pi', 'Rateme', 'RATS', 'reactiongifs', 'reactiongifs', 'realasians', 'realasians', 'realdubstep', 'RealGirls', 'RealGirls', 'recipes', 'recipes', 'reddevils', 'reddit.com', 'RedditDayOf', 'RedditDayOf', 'RedditLaqueristas', 'RedditLaqueristas', 'reddits', 'reddits', 'redditstories', 'RedditThroughHistory', 'RedditThroughHistory', 'redheads', 'redheads', 'Redskins', 'regularshow', 'regularshow', 'relationship_advice', 'relationship_advice', 'relationships', 'relationships', 'religion', 'RenewableEnergy', 'reportthespammers', 'Republican', 'Republican', 'ReverseEngineering', 'rit', 'robotics', 'RomeSweetRome', 'ronpaul', 'ronpaul', 'RoomPorn', 'RoomPorn', 'roosterteeth', 'roosterteeth', 'RotMG', 'rpg', 'rpg', 'rpg_gamers', 'ruby', 'rugbyunion', 'rule34', 'rule34', 'runescape', 'runescape', 'running', 'running', 'sailing', 'Saints', 'sandiego', 'sandiego', 'sanfrancisco', 'sanfrancisco', 'ScarlettJohansson', 'SceneGirls', 'Scholar', 'science', 'science', 'scifi', 'scifi', 'Scotch', 'Scotch', 'screenshots', 'screenshots', 'Screenwriting', 'Scrubs', 'Scrubs', 'Seahawks', 'Seattle', 'Seattle', 'secretsanta', 'secretsanta', 'seduction', 'seduction', 'see', 'see', 'seinfeld', 'seinfeld', 'self', 'self', 'selfhelp', 'SelfSufficiency', 'sex', 'sex', 'SexPositive', 'Sexy', 'SexyButNotPorn', 'SexyButNotPorn', 'SFGiants', 'SFM', 'SFM', 'Sherlock', 'Sherlock', 'SHHHHHEEEEEEEEIIIITT', 'ShinyPokemon', 'ShinyPorn', 'ShitRedditSays', 'ShitRedditSays', 'Shitty_Watercolour', 'shittyadvice', 'shittyadvice', 'shittyadviceanimals', 'shittyaskscience', 'shittyaskscience', 'shittybattlestations', 'shittyfoodporn', 'ShittyLifeProTips', 'shittyreactiongifs', 'shorthairedhotties', 'shorthairedhotties', 'shortscarystories', 'ShouldIbuythisgame', 'showerbeer', 'shutupandtakemymoney', 'shutupandtakemymoney', 'simpleliving', 'sixwordstories', 'Ska', 'skateboarding', 'skateboarding', 'skeptic', 'skeptic', 'SketchDaily', 'skiing', 'SkyPorn', 'SkyPorn', 'skyrim', 'skyrim', 'slackerrecipes', 'Slender_Man', 'Slender_Man', 'SlenderMan', 'sloths', 'slowcooking', 'snackexchange', 'Sneakers', 'snowboarding', 'snowboarding', 'SNSD', 'soccer', 'soccer', 'SocialEngineering', 'socialism', 'socialism', 'socialskills', 'sociology', 'software', 'somethingimade', 'somethingimade', 'Sonsofanarchy', 'SOPA', 'southpark', 'southpark', 'space', 'space', 'spacedicks', 'spacedicks', 'spaceporn', 'spaceporn', 'SpecArt', 'SpecArt', 'spiders', 'spiders', 'SpideyMeme', 'SpideyMeme', 'spongebob', 'sports', 'sports', 'SquaredCircle', 'SquaredCircle', 'SRDBroke', 'SRSWomen', 'Stacked', 'Stahp', 'StandUpComedy', 'StandUpComedy', 'standupshots', 'standupshots', 'starcraft', 'starcraft', 'Stargate', 'starlets', 'startrek', 'startrek', 'startups', 'StarWars', 'StarWars', 'StateOfTheUnion', 'statistics', 'Steam', 'Steam', 'steamdeals', 'SteamGameSwap', 'steampunk', 'steelers', 'stencils', 'stencils', 'StLouis', 'stockings', 'stockings', 'StonerEngineering', 'StonerEngineering', 'StonerProTips', 'StonerProTips', 'stopsmoking', 'stopsmoking', 'subaru', 'SubredditDrama', 'SubredditDrama', 'subredditoftheday', 'subredditoftheday', 'subs', 'subs', 'subscribers', 'suicidegirls', 'suicidegirls', 'SuicideWatch', 'SuicideWatch', 'summonerschool', 'Supernatural', 'Supernatural', 'surfing', 'Survival', 'sweden', 'sweden', 'swoleacceptance', 'swtor', 'swtor', 'sysadmin', 'sysadmin', 'TalesFromRetail', 'TalesFromRetail', 'talesfromtechsupport', 'talesfromtechsupport', 'tall', 'tall', 'tattoo', 'tattoo', 'tattoos', 'tattoos', 'tea', 'tea', 'TechNewsToday', 'TechNewsToday', 'technology', 'technology', 'techsupport', 'techsupport', 'techsupportgore', 'techsupportgore', 'ted', 'tedtalks', 'teenagers', 'teenagers', 'teenboobies', 'tekkit', 'television', 'television', 'Terraria', 'terriblefacebookmemes', 'Texans', 'texas', 'texas', 'tf2', 'tf2', 'TF2fashionadvice', 'tf2trade', 'tf2trade', 'Tgirls', 'Tgirls', 'TheAgora', 'theeternalwar', 'TheFacebookDelusion', 'TheFacebookDelusion', 'TheHobbit', 'TheLastAirbender', 'TheLastAirbender', 'TheoryOfReddit', 'TheoryOfReddit', 'theredditor', 'TheSimpsons', 'TheSimpsons', 'thesims', 'TheStopGirl', 'Thetruthishere', 'thewalkingdead', 'thewalkingdead', 'TheWayWeWere', 'thick', 'thick', 'ThriftStoreHauls', 'Thrifty', 'tifu', 'tifu', 'tightdresses', 'TightShorts', 'TightShorts', 'TimAndEric', 'tinycode', 'TinyHouses', 'TinyHouses', 'TinyTits', 'TinyTits', 'tipofmytongue', 'tipofmytongue', 'TittyDrop', 'tldr', 'todayilearned', 'todayilearned', 'TomHardy', 'tomhiddleston', 'tonightsdinner', 'tonightsdinner', 'toosoon', 'toosoon', 'TopGear', 'TopGear', 'toplessamateurs', 'Torchlight', 'Torchlight', 'toronto', 'toronto', 'torrents', 'torrents', 'totalwar', 'trackers', 'trailerparkboys', 'trailerparkboys', 'trance', 'trance', 'transgender', 'transgender', 'Transhuman', 'travel', 'travel', 'treecomics', 'treecomics', 'treemusic', 'treemusic', 'trees', 'trees', 'treesgonewild', 'treesgonewild', 'Tribes', 'trippy', 'TrollingAnimals', 'TrollXChromosomes', 'TrollXChromosomes', 'TrueAskReddit', 'TrueAtheism', 'TrueAtheism', 'TrueBlood', 'TrueFilm', 'truegaming', 'truegaming', 'TrueReddit', 'TrueReddit', 'TrueTrueReddit', 'TwoXChromosomes', 'TwoXChromosomes', 'typography', 'Ubuntu', 'Ubuntu', 'UFOs', 'UFOs', 'UIUC', 'ukpolitics', 'ukpolitics', 'Unashamed', 'Unashamed', 'unitedkingdom', 'unitedkingdom', 'UniversityofReddit', 'UpliftingNews', 'UpliftingNews', 'Upskirt', 'Upskirt', 'upvotegifs', 'urbanexploration', 'vancouver', 'vancouver', 'vegan', 'vegan', 'vegetarian', 'VegRecipes', 'vertical', 'vertical', 'vexillology', 'video', 'video', 'videos', 'videos', 'VillagePorn', 'VillagePorn', 'vim', 'vinyl', 'vinyl', 'vita', 'VolleyballGirls', 'VolleyballGirls', 'voluptuous', 'wallpaper', 'wallpaper', 'wallpapers', 'wallpapers', 'Warhammer', 'Warhammer', 'washingtondc', 'washingtondc', 'Watches', 'Watches', 'waterporn', 'waterporn', 'WeAreTheMusicMakers', 'WeAreTheMusicMakers', 'web_design', 'web_design', 'webcomics', 'webcomics', 'webdesign', 'webdev', 'webdev', 'WebGames', 'WebGames', 'weightroom', 'Weird', 'whatisthisthing', 'whatisthisthing', 'whatsthisbug', 'whatsthisbug', 'whoselineisitanyway', 'wicked_edge', 'wicked_edge', 'wifesharing', 'wiiu', 'WikiLeaks', 'WikiLeaks', 'wikipedia', 'wikipedia', 'windows', 'windowshots', 'windowsphone', 'wine', 'wisconsin', 'woahdude', 'woahdude', 'women', 'women', 'WomenOfColor', 'WomenOfColor', 'woodworking', 'woodworking', 'Wordpress', 'workaholics', 'workaholics', 'worldbuilding', 'worldevents', 'worldnews', 'worldnews', 'WorldofTanks', 'worldpolitics', 'worldpolitics', 'worstof', 'wow', 'wow', 'writing', 'writing', 'WTF', 'WTF', 'WtSSTaDaMiT', 'WtSSTaDaMiT', 'xbox360', 'xbox360', 'Xcom', 'xkcd', 'xkcd', 'xxfitness', 'yiff', 'yoga', 'YouShouldKnow', 'YouShouldKnow', 'youtubecomments', 'youtubehaiku', 'youtubehaiku', 'yugioh', 'zelda', 'zelda', 'zen', 'ZenHabits', 'zombies', 'zombies'];
	$( "#users_choice" ).autocomplete({
   		source: availableTags
   	});
   	
	RedditMain = new RedditGL();
	RedditMain.init();

});


// Global GL context
var gl;
/*
 * Main RedditGL class
 */
var RedditGL = function() 
{	
	this.ready = false; // Flag set to true when finished with init
	this.loaded = false; // Flag set to true when all async loading complete
	this.readyCount = 0;
};

RedditGL.prototype.init = function() 
{
	RedditGL_LOG("Starting RedditGL...");
	// Web service
	this.serviceManager = new RedditClientService();
	// UI
	this.UIManager = new DynamicUI();
	this.UIManager.init("infoDiv");
	/*
	 * Define some constants
	 */
	this.maxObjectCount=AlphabetGL.length+3; // Max value of objects to be loaded
	this.maxInstanceCount=1000;
	/*
	 * Init gl & texture manager
	 */
  	var canvas = document.getElementById("webglCanvas");
  	// If we don't set this here, the rendering will be skewed
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  	// Grab render
	this.render = new RedditGL_Render();
  	gl=initGL(canvas);
  	gl.textureManager = new GLTextureManger();
  	gl.textureManager.init(gl);
  	
  	var fsColor = "shaderColor-fs";
  	var vsColor = "shaderColor-vs";
  	var fs = "shader-fs";
  	var vs = "shader-vs";
  	var attribs = ["aVertexPosition", "aTextureCoord"];
  	var uniforms = ["uViewMatrix", "uMVMatrix", "uPMatrix", "uSampler"];
  	var attribsC = ["aVertexPosition", "aColor"];
  	var uniformsC = ["uViewMatrix", "uMVMatrix", "uPMatrix"];
  	var shaders =
  	{
  		texture: initShader(gl,vs,fs,attribs,uniforms),
  		color: initShader(gl,vsColor,fsColor,attribsC,uniformsC)
  	};
  	
  	// Load data into scene
  	this.initScene(canvas, shaders);
    
  	// Set canvas settings
	this.setUpFullScreen(gl, canvas);
  	this.render.resize(gl, this.scene, canvas);
  	gl.clearColor(0.0,0.0,0.0,1.0); // Black
  	gl.enable(gl.DEPTH_TEST); //Enable debth testing
  	// Set rdy flag
   	this.ready = true;  	
   	// Start her up!
   	RedditGL_LOG("Starting RedditGL renderloop");
   	var self = this;
   	var fpsCounter = document.getElementById("fps");
   	startRenderLoop(canvas,function(timing) 
   	{
    	fpsCounter.innerHTML = timing.framesPerSecond;
        self.runClient(timing);
    });
};

RedditGL.prototype.setUpFullScreen = function(gl, canvas)
{
	//
    // Wire up the Fullscreen button
    //
    var frame = document.getElementById("reddit-frame");
    var fullscreenBtn = document.getElementById("fullscreen");
    document.cancelFullScreen = document.webkitCancelFullScreen||document.mozCancelFullScreen;

    var canvasOriginalWidth = canvas.width;
    var canvasOriginalHeight = canvas.height;
    fullscreenBtn.addEventListener("click",function() 
    {
        if(frame.webkitRequestFullScreen) 
        {
            frame.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if(frame.mozRequestFullScreen) 
        {
            frame.mozRequestFullScreen();
        }
    }, false);
	var self = this;
    function fullscreenchange() 
    {
        if(document.webkitIsFullScreen||document.mozFullScreen) 
        {
            canvas.width = screen.width;
            canvas.height = screen.height;
        } else 
        {
            canvas.width = canvasOriginalWidth;
            canvas.height = canvasOriginalHeight;
        }
        self.render.resize(gl,self.scene,canvas);
    }
    frame.addEventListener("webkitfullscreenchange",fullscreenchange,false);
    frame.addEventListener("mozfullscreenchange",fullscreenchange,false);
};
/*
 * Test scene
 */
RedditGL.prototype.initScene = function(canvas, shaders) 
{
  	var camera = new CameraWebGLOrbit(1000);
  	camera.init(canvas);
  	camera.setDistance(20.0);
  	this.scene = 
  	{
  		camera: camera,
  		sceneObjects: new Array(),
  		shaders: shaders
  	};

  	/*
  	 * BufferObject: low-level webgl wrapper
  	 * TextGL: High-level text wrapper
  	*/
  	// Init TextGL
  	initAlphabet()
  	// initBufferObject(glRef, objType, obj, hasTexture)
  	// Create Primitive[skybox]
  	initBufferObject(gl,"environment","skybox","root/textures/space.jpg"); 		
  	// Create Primitive[cube]
  	initBufferObject(gl,"primitive","cube","root/textures/LichKing.jpg"); 
  	// Create Primitive[sphere]
  	initBufferObject(gl,"primitive","sphere","root/textures/grim-icon.png"); 
  	// Create a Model[!Text]
  	//initBufferObject(gl, "model", "root/models/Teapot.json", "root/textures/grim-icon.png"); 
};
/*
 * Called when all objects have been loaded
 */
RedditGL.prototype.loadComplete = function() 
{ 	
   	RedditGL_LOG("Load completed");
   	this.loaded = true;  	  	
   	this.serviceManager.connectToService();
   	this.serviceManager.addListener();
   	this.serviceManager.webSocket();
};
/*
 * Loads scene with object data, each object has instances attached to it
 */
//addWord("Reallylongstring", model.name, 0);
RedditGL.prototype.addObject = function(model) 
{
	this.scene.sceneObjects.push(model);
	this.readyCount++;
	
	if(this.readyCount == this.maxObjectCount) 
	{
		this.loadComplete();
	}
};

RedditGL.prototype.runClient = function(timing) 
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	if(this.ready == true) 
	{
		this.render.update(this.scene,timing);
		this.render.drawScene(gl,this.scene);
	}  
};