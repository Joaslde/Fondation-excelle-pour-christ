import { type User, type InsertUser, type ContactSubmission, type InsertContact, type Verse, users, contactSubmissions } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getRandomVerse(): Verse;
}

const verses: Verse[] = [
  { text: "Je ferai de toi une grande nation, et je te bénirai; je rendrai ton nom grand, et tu seras une source de bénédiction.", reference: "Genèse 12:2" },
  { text: "Lève-toi, sois éclairée, car ta lumière arrive, Et la gloire de l'Eternel se lève sur toi.", reference: "Ésaïe 60:1" },
  { text: "Tu tressailliras alors et tu te réjouiras, Et ton coeur bondira et se dilatera, Quand les richesses de la mer se tourneront vers toi, Quand les trésors des nations viendront à toi.", reference: "Ésaïe 60:5" },
  { text: "Voici, les ténèbres couvrent la terre, Et l'obscurité les peuples; Mais sur toi l'Eternel se lève, Sur toi sa gloire apparaît.", reference: "Ésaïe 60:2" },
  { text: "Au lieu que tu étais délaissée et haïe, Et que personne ne te parcourait, Je ferai de toi un ornement pour toujours, Un sujet de joie de génération en génération.", reference: "Ésaïe 60:15" },
  { text: "Tu suceras le lait des nations, Tu suceras la mamelle des rois; Et tu sauras que je suis l'Eternel, ton sauveur, Ton rédempteur, le puissant de Jacob.", reference: "Ésaïe 60:16" },
  { text: "Au lieu de l'airain je ferai venir de l'or, Au lieu du fer je ferai venir de l'argent, Au lieu du bois, de l'airain, Et au lieu des pierres, du fer; Je ferai régner sur toi la paix, Et dominer la justice.", reference: "Ésaïe 60:17" },
  { text: "On n'entendra plus parler de violence dans ton pays, Ni de ravage et de ruine dans ton territoire; Tu donneras à tes murs le nom de salut, Et à tes portes celui de gloire.", reference: "Ésaïe 60:18" },
  { text: "Je mettrai la paix dans le pays, et personne ne troublera votre sommeil; je ferai disparaître du pays les bêtes féroces, et l'épée ne passera point par votre pays.", reference: "Lévitique 26:6" },
  { text: "Que l'Eternel tourne sa face vers toi, et qu'il te donne la paix!", reference: "Nombres 6:26" },
  { text: "Et l'Eternel lui dit: Sois en paix, ne crains point, tu ne mourras pas.", reference: "Juges 6:23" },
  { text: "Et le prêtre leur répondit: Allez en paix; le voyage que vous faites est sous le regard de l'Eternel.", reference: "Juges 18:6" },
  { text: "Eli reprit la parole, et dit: Va en paix, et que le Dieu d'Israël exauce la prière que tu lui as adressée!", reference: "1 Samuel 1:17" },
  { text: "Les villes que les Philistins avaient prises sur Israël retournèrent à Israël, depuis Ekron jusqu'à Gath, avec leur territoire; Israël les arracha de la main des Philistins. Et il y eut paix entre Israël et les Amoréens.", reference: "1 Samuel 7:14" },
  { text: "Pour la vie sois en paix, et que la paix soit avec ta maison et tout ce qui t'appartient!", reference: "1 Samuel 25:6" },
  { text: "Voici, il te naîtra un fils, qui sera un homme de repos, et à qui je donnerai du repos en le délivrant de tous ses ennemis d'alentour; car Salomon sera son nom, et je ferai venir sur Israël la paix et la tranquillité pendant sa vie.", reference: "1 Chroniques 22:9" },
  { text: "Attache-toi donc à Dieu, et tu auras la paix; Tu jouiras ainsi du bonheur.", reference: "Job 22:21" },
  { text: "Eloigne-toi du mal, et fais le bien; Recherche et poursuis la paix.", reference: "Psaumes 34:14" },
  { text: "En ses jours le juste fleurira, Et la paix sera grande jusqu'à ce qu'il n'y ait plus de lune.", reference: "Psaumes 72:7" },
  { text: "Il y a beaucoup de paix pour ceux qui aiment ta loi, Et il ne leur arrive aucun malheur.", reference: "Psaumes 119:165" },
  { text: "Demandez la paix de Jérusalem. Que ceux qui t'aiment jouissent du repos!", reference: "Psaumes 122:6" },
  { text: "Que la paix soit dans tes murs, Et la tranquillité dans tes palais!", reference: "Psaumes 122:7" },
  { text: "Tu verras les fils de tes fils. Que la paix soit sur Israël!", reference: "Psaumes 128:6" },
  { text: "Il rend la paix à ton territoire, Il te rassasie du meilleur froment.", reference: "Psaumes 147:14" },
  { text: "Dans vos jours de joie, dans vos fêtes, et à vos nouvelles lunes, vous sonnerez des trompettes, en offrant vos holocaustes et vos sacrifices d'actions de grâces, et elles vous mettront en souvenir devant votre Dieu. Je suis l'Eternel, votre Dieu.", reference: "Nombres 10:10" },
  { text: "Tu célébreras la fête pendant sept jours en l'honneur de l'Eternel, ton Dieu, dans le lieu que choisira l'Eternel; car l'Eternel, ton Dieu, te bénira dans toutes tes récoltes et dans tout le travail de tes mains, et tu te livreras entièrement à la joie.", reference: "Deutéronome 16:15" },
  { text: "Il n'y avait pour les Juifs que bonheur et joie, allégresse et gloire.", reference: "Esther 8:16" },
  { text: "Il remplira ta bouche de cris de joie, Et tes lèvres de chants d'allégresse.", reference: "Job 8:21" },
  { text: "Tu mets dans mon cœur plus de joie qu'ils n'en ont Quand abondent leur froment et leur moût.", reference: "Psaumes 4:7" },
  { text: "Alors tous ceux qui se confient en toi se réjouiront, Ils auront de l'allégresse à toujours, et tu les protégeras; Tu seras un sujet de joie Pour ceux qui aiment ton nom.", reference: "Psaumes 5:11" },
  { text: "Tu le rends à jamais un objet de bénédictions, Tu le combles de joie devant ta face.", reference: "Psaumes 21:6" },
  { text: "Et tu as changé mes lamentations en allégresse, Tu as délié mon sac, et tu m'as ceint de joie.", reference: "Psaumes 30:11" },
  { text: "Je serai par ta grâce dans l'allégresse et dans la joie; Car tu vois ma misère, tu sais les angoisses de mon âme.", reference: "Psaumes 31:7" },
  { text: "Justes, réjouissez-vous en l'Eternel et soyez dans l'allégresse! Poussez des cris de joie, vous tous qui êtes droits de cœur!", reference: "Psaumes 32:11" },
  { text: "Quand on tourne vers lui les regards, on est rayonnant de joie, Et le visage ne se couvre pas de honte.", reference: "Psaumes 34:5" },
  { text: "Et mon âme aura de la joie en l'Eternel, De l'allégresse en son salut.", reference: "Psaumes 35:9" },
  { text: "Servez l'Eternel, avec joie, Venez avec allégresse en sa présence!", reference: "Psaumes 100:2" },
  { text: "C'est ici la journée que l'Eternel a faite: Qu'elle soit pour nous un sujet d'allégresse et de joie!", reference: "Psaumes 118:24" },
  { text: "Qu'il te donne la bénédiction d'Abraham, à toi et à ta postérité avec toi, afin que tu possèdes le pays où tu habites comme étranger, et qu'il a donné à Abraham!", reference: "Genèse 28:4" },
  { text: "Je vous accorderai ma bénédiction la sixième année, et elle donnera des produits pour trois ans.", reference: "Lévitique 25:21" },
  { text: "L'Eternel ordonnera à la bénédiction d'être avec toi dans tes greniers et dans toutes tes entreprises. Il te bénira dans le pays que l'Eternel, ton Dieu, te donne.", reference: "Deutéronome 28:8" },
  { text: "Sur Joseph il dit: Son pays recevra de l'Eternel, en signe de bénédiction, Le meilleur don du ciel, la rosée, Les meilleures eaux qui sont en bas.", reference: "Deutéronome 33:13" },
  { text: "Car je répandrai des eaux sur le sol altéré, Et des ruisseaux sur la terre desséchée; Je répandrai mon esprit sur ta race, Et ma bénédiction sur tes rejetons.", reference: "Ésaïe 44:3" },
  { text: "Je ferai d'elles et des environs de ma colline un sujet de bénédiction; j'enverrai la pluie en son temps, et ce sera une pluie de bénédiction.", reference: "Ézéchiel 34:26" },
  { text: "Y avait-il encore de la semence dans les greniers? Même la vigne, le figuier, le grenadier et l'olivier, N'ont rien rapporté. Mais dès ce jour je répandrai ma bénédiction.", reference: "Aggée 2:19" },
  { text: "De même que vous avez été en malédiction parmi les nations, maison de Juda et maison d'Israël, de même je vous sauverai, et vous serez en bénédiction. Ne craignez pas, et que vos mains se fortifient!", reference: "Zacharie 8:13" },
  { text: "Apportez à la maison du trésor toutes les dîmes, Afin qu'il y ait de la nourriture dans ma maison; Mettez-moi de la sorte à l'épreuve, Dit l'Eternel des armées. Et vous verrez si je n'ouvre pas pour vous les écluses des cieux, Si je ne répands pas sur vous la bénédiction en abondance.", reference: "Malachie 3:10" },
  { text: "Ne rendez point mal pour mal, ou injure pour injure; bénissez, au contraire, car c'est à cela que vous avez été appelés, afin d'hériter la bénédiction.", reference: "1 Pierre 3:9" },
  { text: "Voici, j'ai reçu l'ordre de bénir: Il a béni, je ne le révoquerai point.", reference: "Nombres 23:20" },
  { text: "L'Eternel t'ouvrira son bon trésor, le ciel, pour envoyer à ton pays la pluie en son temps et pour bénir tout le travail de tes mains; tu prêteras à beaucoup de nations, et tu n'emprunteras point.", reference: "Deutéronome 28:12" },
  { text: "C'est moi, moi qui efface tes transgressions pour l'amour de moi, Et je ne me souviendrai plus de tes péchés.", reference: "Ésaïe 43:25" },
  { text: "C'est pour l'amour de moi, pour l'amour de moi, que je veux agir; Car comment mon nom serait-il profané? Je ne donnerai pas ma gloire à un autre.", reference: "Ésaïe 48:11" },
  { text: "Dans un instant de colère, je t'avais un moment dérobé ma face, Mais avec un amour éternel j'aurai compassion de toi, Dit ton rédempteur, l'Eternel.", reference: "Ésaïe 54:8" },
  { text: "Quand les montagnes s'éloigneraient, Quand les collines chancelleraient, Mon amour ne s'éloignera point de toi, Et mon alliance de paix ne chancellera point, Dit l'Eternel, qui a compassion de toi.", reference: "Ésaïe 54:10" },
  { text: "Pour l'amour de Sion je ne me tairai point, Pour l'amour de Jérusalem je ne prendrai point de repos, Jusqu'à ce que son salut paraisse, comme l'aurore, Et sa délivrance, comme un flambeau qui s'allume.", reference: "Ésaïe 62:1" },
  { text: "Dans toutes leurs détresses ils n'ont pas été sans secours, Et l'ange qui est devant sa face les a sauvés; Il les a lui-même rachetés, dans son amour et sa miséricorde, Et constamment il les a soutenus et portés, aux anciens jours.", reference: "Ésaïe 63:9" },
  { text: "Ils te feront la guerre, mais ils ne te vaincront pas; car je suis avec toi pour te délivrer, dit l'Eternel.", reference: "Jérémie 1:19" },
  { text: "De loin l'Eternel se montre à moi: Je t'aime d'un amour éternel; C'est pourquoi je te conserve ma bonté.", reference: "Jérémie 31:3" },
  { text: "Je réparerai leur infidélité, J'aurai pour eux un amour sincère; Car ma colère s'est détournée d'eux.", reference: "Osée 14:4" },
  { text: "L'Eternel, ton Dieu, est au milieu de toi, comme un héros qui sauve; Il fera de toi sa plus grande joie; Il gardera le silence dans son amour; Il aura pour toi des transports d'allégresse.", reference: "Sophonie 3:17" },
  { text: "Comme le Père m'a aimé, je vous ai aussi aimés. Demeurez dans mon amour.", reference: "Jean 15:9" },
  { text: "Si vous gardez mes commandements, vous demeurerez dans mon amour, de même que j'ai gardé les commandements de mon Père, et que je demeure dans son amour.", reference: "Jean 15:10" },
  { text: "Au reste, frères, soyez dans la joie, perfectionnez-vous, consolez-vous, ayez un même sentiment, vivez en paix; et le Dieu d'amour et de paix sera avec vous.", reference: "2 Corinthiens 13:11" },
  { text: "Que le Seigneur dirige vos cœurs vers l'amour de Dieu et vers la patience de Christ!", reference: "2 Thessaloniciens 3:5" },
  { text: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.", reference: "2 Timothée 1:7" },
  { text: "Car Dieu n'est pas injuste, pour oublier votre travail et l'amour que vous avez montré pour son nom, ayant rendu et rendant encore des services aux saints.", reference: "Hébreux 6:10" },
  { text: "Ne vous livrez pas à l'amour de l'argent; contentez-vous de ce que vous avez; car Dieu lui-même a dit: Je ne te délaisserai point, et je ne t'abandonnerai point.", reference: "Hébreux 13:5" },
  { text: "Mais celui qui garde sa parole, l'amour de Dieu est véritablement parfait en lui: par là nous savons que nous sommes en lui.", reference: "1 Jean 2:5" },
  { text: "Et c'est à tes pères seulement que l'Eternel s'est attaché pour les aimer; et, après eux, c'est leur postérité, c'est vous qu'il a choisis d'entre tous les peuples, comme vous le voyez aujourd'hui.", reference: "Deutéronome 10:15" },
  { text: "Car je te prescris aujourd'hui d'aimer l'Eternel, ton Dieu, de marcher dans ses voies, et d'observer ses commandements, ses lois et ses ordonnances, afin que tu vives et que tu multiplies, et que l'Eternel, ton Dieu, te bénisse dans le pays dont tu vas entrer en possession.", reference: "Deutéronome 30:16" },
  { text: "Je mettrai la louange sur les lèvres. Paix, paix à celui qui est loin et à celui qui est près! dit l'Eternel. Je les guérirai.", reference: "Ésaïe 57:19" },
  { text: "Pour accorder aux affligés de Sion, Pour leur donner un diadème au lieu de la cendre, Une huile de joie au lieu du deuil, Un vêtement de louange au lieu d'un esprit abattu, Afin qu'on les appelle des térébinthes de la justice, Une plantation de l'Eternel, pour servir à sa gloire.", reference: "Ésaïe 61:3" },
  { text: "Car, comme la terre fait éclore son germe, Et comme un jardin fait pousser ses semences, Ainsi le Seigneur, l'Eternel, fera germer le salut et la louange, En présence de toutes les nations.", reference: "Ésaïe 61:11" },
  { text: "Cette ville sera pour moi un sujet de joie, de louange et de gloire, Parmi toutes les nations de la terre, Qui apprendront tout le bien que je leur ferai; Elles seront étonnées et émues de tout le bonheur Et de toute la prospérité que je leur accorderai.", reference: "Jérémie 33:9" },
  { text: "Voici, en ce temps-là, j'agirai contre tous tes oppresseurs; Je délivrerai les boiteux et je recueillerai ceux qui ont été chassés, Je ferai d'eux un sujet de louange et de gloire Dans tous les pays où ils sont en opprobre.", reference: "Sophonie 3:19" },
  { text: "En ce temps-là, je vous ramènerai; En ce temps-là, je vous rassemblerai; Car je ferai de vous un sujet de gloire et de louange Parmi tous les peuples de la terre, Quand je ramènerai vos captifs sous vos yeux, Dit l'Eternel.", reference: "Sophonie 3:20" },
  { text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", reference: "Jean 3:16" },
  { text: "L'Éternel est mon berger: je ne manquerai de rien.", reference: "Psaume 23:1" },
  { text: "Je puis tout par celui qui me fortifie.", reference: "Philippiens 4:13" },
  { text: "Ne crains point, car je suis avec toi; Ne t'effraie point, car je suis ton Dieu.", reference: "Ésaïe 41:10" },
  { text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", reference: "Matthieu 11:28" },
  { text: "Confie-toi en l'Éternel de tout ton cœur, Et ne t'appuie pas sur ta sagesse.", reference: "Proverbes 3:5" },
  { text: "L'Éternel est ma lumière et mon salut: De qui aurais-je crainte?", reference: "Psaume 27:1" },
  { text: "Et nous savons que toutes choses concourent au bien de ceux qui aiment Dieu.", reference: "Romains 8:28" },
  { text: "Mais ceux qui se confient en l'Éternel renouvellent leur force.", reference: "Ésaïe 40:31" },
  { text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur.", reference: "Jérémie 29:11" },
  { text: "En toutes choses rendez grâces; car c'est à votre égard la volonté de Dieu en Jésus-Christ.", reference: "1 Thessaloniciens 5:18" },
  { text: "Soyez forts et courageux. N'ayez pas peur et ne soyez pas effrayés devant eux.", reference: "Deutéronome 31:6" },
  { text: "Ta parole est une lampe à mes pieds, Et une lumière sur mon sentier.", reference: "Psaume 119:105" },
  { text: "L'amour est patient, il est plein de bonté; l'amour n'est point envieux.", reference: "1 Corinthiens 13:4" },
  { text: "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.", reference: "Matthieu 6:33" },
];

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(insertContact).returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions);
  }

  getRandomVerse(): Verse {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  }
}

export const storage = new DatabaseStorage();
