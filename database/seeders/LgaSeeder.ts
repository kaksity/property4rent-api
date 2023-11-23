import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SettingsLga from 'App/Systems/Settings/Location/Models/SettingsLga'

export default class LgaSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    const lgasData = [
      {
        lgaLabel: 'Agege LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Ajeromi-Ifelodun LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Alimosho LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Amuwo-Odofin LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Apapa LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Badagry LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Epe LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Eti Osa LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Ibeju-Lekki LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Ifako-Ijaiye LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Ikeja LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Ikorodu LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Kosofe LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Lagos Island LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Lagos Mainland LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Mushin LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Ojo LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Oshodi-Isolo LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Shomolu LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Surulere LGA',
        stateId: 25,
      },
      {
        lgaLabel: 'Aba North',
        stateId: 1,
      },
      {
        lgaLabel: 'Arochukwu',
        stateId: 1,
      },
      {
        lgaLabel: 'Aba South',
        stateId: 1,
      },
      {
        lgaLabel: 'Bende',
        stateId: 1,
      },
      {
        lgaLabel: 'Isiala Ngwa North',
        stateId: 1,
      },
      {
        lgaLabel: 'Ikwuano',
        stateId: 1,
      },
      {
        lgaLabel: 'Isiala Ngwa South',
        stateId: 1,
      },
      {
        lgaLabel: 'Isuikwuato',
        stateId: 1,
      },
      {
        lgaLabel: 'Obi Ngwa',
        stateId: 1,
      },
      {
        lgaLabel: 'Ohafia',
        stateId: 1,
      },
      {
        lgaLabel: 'Osisioma',
        stateId: 1,
      },
      {
        lgaLabel: 'Ugwunagbo',
        stateId: 1,
      },
      {
        lgaLabel: 'Ukwa East',
        stateId: 1,
      },
      {
        lgaLabel: 'Ukwa West',
        stateId: 1,
      },
      {
        lgaLabel: 'Umuahia North',
        stateId: 1,
      },
      {
        lgaLabel: 'Umuahia South',
        stateId: 1,
      },
      {
        lgaLabel: 'Umu Nneochi',
        stateId: 1,
      },
      {
        lgaLabel: 'Demsa',
        stateId: 2,
      },
      {
        lgaLabel: 'Fufure',
        stateId: 2,
      },
      {
        lgaLabel: 'Ganye',
        stateId: 2,
      },
      {
        lgaLabel: 'Gayuk',
        stateId: 2,
      },
      {
        lgaLabel: 'Gombi',
        stateId: 2,
      },
      {
        lgaLabel: 'Grie',
        stateId: 2,
      },
      {
        lgaLabel: 'Hong',
        stateId: 2,
      },
      {
        lgaLabel: 'Jada',
        stateId: 2,
      },
      {
        lgaLabel: 'Larmurde',
        stateId: 2,
      },
      {
        lgaLabel: 'Madagali',
        stateId: 2,
      },
      {
        lgaLabel: 'Maiha',
        stateId: 2,
      },
      {
        lgaLabel: 'Mayo Belwa',
        stateId: 2,
      },
      {
        lgaLabel: 'Michika',
        stateId: 2,
      },
      {
        lgaLabel: 'Mubi North',
        stateId: 2,
      },
      {
        lgaLabel: 'Mubi South',
        stateId: 2,
      },
      {
        lgaLabel: 'Numan',
        stateId: 2,
      },
      {
        lgaLabel: 'Shelleng',
        stateId: 2,
      },
      {
        lgaLabel: 'Song',
        stateId: 2,
      },
      {
        lgaLabel: 'Toungo',
        stateId: 2,
      },
      {
        lgaLabel: 'Yola North',
        stateId: 2,
      },
      {
        lgaLabel: 'Yola South',
        stateId: 2,
      },
      {
        lgaLabel: 'Abak',
        stateId: 3,
      },
      {
        lgaLabel: 'Eastern Obolo',
        stateId: 3,
      },
      {
        lgaLabel: 'Eket',
        stateId: 3,
      },
      {
        lgaLabel: 'Esit Eket',
        stateId: 3,
      },
      {
        lgaLabel: 'Essien Udim',
        stateId: 3,
      },
      {
        lgaLabel: 'Etim Ekpo',
        stateId: 3,
      },
      {
        lgaLabel: 'Etinan',
        stateId: 3,
      },
      {
        lgaLabel: 'Ibeno',
        stateId: 3,
      },
      {
        lgaLabel: 'Ibesikpo Asutan',
        stateId: 3,
      },
      {
        lgaLabel: 'Ibiono-Ibom',
        stateId: 3,
      },
      {
        lgaLabel: 'Ikot Abasi',
        stateId: 3,
      },
      {
        lgaLabel: 'Ika',
        stateId: 3,
      },
      {
        lgaLabel: 'Ikono',
        stateId: 3,
      },
      {
        lgaLabel: 'Ikot Ekpene',
        stateId: 3,
      },
      {
        lgaLabel: 'Ini',
        stateId: 3,
      },
      {
        lgaLabel: 'Mkpat-Enin',
        stateId: 3,
      },
      {
        lgaLabel: 'Itu',
        stateId: 3,
      },
      {
        lgaLabel: 'Mbo',
        stateId: 3,
      },
      {
        lgaLabel: 'Nsit-Atai',
        stateId: 3,
      },
      {
        lgaLabel: 'Nsit-Ibom',
        stateId: 3,
      },
      {
        lgaLabel: 'Nsit-Ubium',
        stateId: 3,
      },
      {
        lgaLabel: 'Obot Akara',
        stateId: 3,
      },
      {
        lgaLabel: 'Okobo',
        stateId: 3,
      },
      {
        lgaLabel: 'Onna',
        stateId: 3,
      },
      {
        lgaLabel: 'Oron',
        stateId: 3,
      },
      {
        lgaLabel: 'Udung-Uko',
        stateId: 3,
      },
      {
        lgaLabel: 'Ukanafun',
        stateId: 3,
      },
      {
        lgaLabel: 'Oruk Anam',
        stateId: 3,
      },
      {
        lgaLabel: 'Uruan',
        stateId: 3,
      },
      {
        lgaLabel: 'Urue-Offong/Oruko',
        stateId: 3,
      },
      {
        lgaLabel: 'Uruan',
        stateId: 3,
      },
      {
        lgaLabel: 'Aguata',
        stateId: 4,
      },
      {
        lgaLabel: 'Anambra East',
        stateId: 4,
      },
      {
        lgaLabel: 'Anaocha',
        stateId: 4,
      },
      {
        lgaLabel: 'Awka North',
        stateId: 4,
      },
      {
        lgaLabel: 'Anambra West',
        stateId: 4,
      },
      {
        lgaLabel: 'Awka South',
        stateId: 4,
      },
      {
        lgaLabel: 'Ayamelum',
        stateId: 4,
      },
      {
        lgaLabel: 'Dunukofia',
        stateId: 4,
      },
      {
        lgaLabel: 'Ekwusigo',
        stateId: 4,
      },
      {
        lgaLabel: 'Idemili North',
        stateId: 4,
      },
      {
        lgaLabel: 'Idemili South',
        stateId: 4,
      },
      {
        lgaLabel: 'Ihiala',
        stateId: 4,
      },
      {
        lgaLabel: 'Njikoka',
        stateId: 4,
      },
      {
        lgaLabel: 'Nnewi North',
        stateId: 4,
      },
      {
        lgaLabel: 'Nnewi South',
        stateId: 4,
      },
      {
        lgaLabel: 'Ogbaru',
        stateId: 4,
      },
      {
        lgaLabel: 'Onitsha North',
        stateId: 4,
      },
      {
        lgaLabel: 'Onitsha South',
        stateId: 4,
      },
      {
        lgaLabel: 'Orumba North',
        stateId: 4,
      },
      {
        lgaLabel: 'Orumba South',
        stateId: 4,
      },
      {
        lgaLabel: 'Oyi',
        stateId: 4,
      },
      {
        lgaLabel: 'Alkaleri',
        stateId: 5,
      },
      {
        lgaLabel: 'Bauchi',
        stateId: 5,
      },
      {
        lgaLabel: 'Bogoro',
        stateId: 5,
      },
      {
        lgaLabel: 'Damban',
        stateId: 5,
      },
      {
        lgaLabel: 'Darazo',
        stateId: 5,
      },
      {
        lgaLabel: 'Dass',
        stateId: 5,
      },
      {
        lgaLabel: 'Gamawa',
        stateId: 5,
      },
      {
        lgaLabel: 'Ganjuwa',
        stateId: 5,
      },
      {
        lgaLabel: 'Giade',
        stateId: 5,
      },
      {
        lgaLabel: 'Itas/Gadau',
        stateId: 5,
      },
      {
        lgaLabel: 'Jama-are',
        stateId: 5,
      },
      {
        lgaLabel: 'Katagum',
        stateId: 5,
      },
      {
        lgaLabel: 'Kirfi',
        stateId: 5,
      },
      {
        lgaLabel: 'Misau',
        stateId: 5,
      },
      {
        lgaLabel: 'Ningi',
        stateId: 5,
      },
      {
        lgaLabel: 'Shira',
        stateId: 5,
      },
      {
        lgaLabel: 'Tafawa Balewa',
        stateId: 5,
      },
      {
        lgaLabel: 'Toro',
        stateId: 5,
      },
      {
        lgaLabel: 'Warji',
        stateId: 5,
      },
      {
        lgaLabel: 'Zaki',
        stateId: 5,
      },
      {
        lgaLabel: 'Brass',
        stateId: 6,
      },
      {
        lgaLabel: 'Ekeremor',
        stateId: 6,
      },
      {
        lgaLabel: 'Kolokuma/Opokuma',
        stateId: 6,
      },
      {
        lgaLabel: 'Nembe',
        stateId: 6,
      },
      {
        lgaLabel: 'Ogbia',
        stateId: 6,
      },
      {
        lgaLabel: 'Sagbama',
        stateId: 6,
      },
      {
        lgaLabel: 'Southern Ijaw',
        stateId: 6,
      },
      {
        lgaLabel: 'Yenagoa',
        stateId: 6,
      },
      {
        lgaLabel: 'Agatu',
        stateId: 7,
      },
      {
        lgaLabel: 'Apa',
        stateId: 7,
      },
      {
        lgaLabel: 'Ado',
        stateId: 7,
      },
      {
        lgaLabel: 'Buruku',
        stateId: 7,
      },
      {
        lgaLabel: 'Gboko',
        stateId: 7,
      },
      {
        lgaLabel: 'Guma',
        stateId: 7,
      },
      {
        lgaLabel: 'Gwer East',
        stateId: 7,
      },
      {
        lgaLabel: 'Gwer West',
        stateId: 7,
      },
      {
        lgaLabel: 'Akwa Ibom-Ala',
        stateId: 7,
      },
      {
        lgaLabel: 'Konshisha',
        stateId: 7,
      },
      {
        lgaLabel: 'Kwande',
        stateId: 7,
      },
      {
        lgaLabel: 'Logo',
        stateId: 7,
      },
      {
        lgaLabel: 'Makurdi',
        stateId: 7,
      },
      {
        lgaLabel: 'Obi',
        stateId: 7,
      },
      {
        lgaLabel: 'Ogbadibo',
        stateId: 7,
      },
      {
        lgaLabel: 'Ohimini',
        stateId: 7,
      },
      {
        lgaLabel: 'Oju',
        stateId: 7,
      },
      {
        lgaLabel: 'Okpokwu',
        stateId: 7,
      },
      {
        lgaLabel: 'Oturkpo',
        stateId: 7,
      },
      {
        lgaLabel: 'Tarka',
        stateId: 7,
      },
      {
        lgaLabel: 'Ukum',
        stateId: 7,
      },
      {
        lgaLabel: 'Ushongo',
        stateId: 7,
      },
      {
        lgaLabel: 'Vandeikya',
        stateId: 7,
      },
      {
        lgaLabel: 'Abadam',
        stateId: 8,
      },
      {
        lgaLabel: 'Askira/Uba',
        stateId: 8,
      },
      {
        lgaLabel: 'Bama',
        stateId: 8,
      },
      {
        lgaLabel: 'Bayo',
        stateId: 8,
      },
      {
        lgaLabel: 'Biu',
        stateId: 8,
      },
      {
        lgaLabel: 'Chibok',
        stateId: 8,
      },
      {
        lgaLabel: 'Damboa',
        stateId: 8,
      },
      {
        lgaLabel: 'Dikwa',
        stateId: 8,
      },
      {
        lgaLabel: 'Guzamala',
        stateId: 8,
      },
      {
        lgaLabel: 'Gubio',
        stateId: 8,
      },
      {
        lgaLabel: 'Hawul',
        stateId: 8,
      },
      {
        lgaLabel: 'Gwoza',
        stateId: 8,
      },
      {
        lgaLabel: 'Jere',
        stateId: 8,
      },
      {
        lgaLabel: 'Kaga',
        stateId: 8,
      },
      {
        lgaLabel: 'Kala/Balge',
        stateId: 8,
      },
      {
        lgaLabel: 'Konduga',
        stateId: 8,
      },
      {
        lgaLabel: 'Kukawa',
        stateId: 8,
      },
      {
        lgaLabel: 'Kwaya Kusar',
        stateId: 8,
      },
      {
        lgaLabel: 'Mafa',
        stateId: 8,
      },
      {
        lgaLabel: 'Magumeri',
        stateId: 8,
      },
      {
        lgaLabel: 'Maiduguri',
        stateId: 8,
      },
      {
        lgaLabel: 'Mobbar',
        stateId: 8,
      },
      {
        lgaLabel: 'Marte',
        stateId: 8,
      },
      {
        lgaLabel: 'Monguno',
        stateId: 8,
      },
      {
        lgaLabel: 'Ngala',
        stateId: 8,
      },
      {
        lgaLabel: 'Nganzai',
        stateId: 8,
      },
      {
        lgaLabel: 'Shani',
        stateId: 8,
      },
      {
        lgaLabel: 'Abi',
        stateId: 9,
      },
      {
        lgaLabel: 'Akamkpa',
        stateId: 9,
      },
      {
        lgaLabel: 'Akpabuyo',
        stateId: 9,
      },
      {
        lgaLabel: 'Bakassi',
        stateId: 9,
      },
      {
        lgaLabel: 'Bekwarra',
        stateId: 9,
      },
      {
        lgaLabel: 'Biase',
        stateId: 9,
      },
      {
        lgaLabel: 'Boki',
        stateId: 9,
      },
      {
        lgaLabel: 'Calabar Municipal',
        stateId: 9,
      },
      {
        lgaLabel: 'Calabar South',
        stateId: 9,
      },
      {
        lgaLabel: 'Etung',
        stateId: 9,
      },
      {
        lgaLabel: 'Ikom',
        stateId: 9,
      },
      {
        lgaLabel: 'Obanliku',
        stateId: 9,
      },
      {
        lgaLabel: 'Obubra',
        stateId: 9,
      },
      {
        lgaLabel: 'Obudu',
        stateId: 9,
      },
      {
        lgaLabel: 'Odukpani',
        stateId: 9,
      },
      {
        lgaLabel: 'Ogoja',
        stateId: 9,
      },
      {
        lgaLabel: 'Yakuur',
        stateId: 9,
      },
      {
        lgaLabel: 'Yala',
        stateId: 9,
      },
      {
        lgaLabel: 'Aniocha North',
        stateId: 10,
      },
      {
        lgaLabel: 'Aniocha South',
        stateId: 10,
      },
      {
        lgaLabel: 'Bomadi',
        stateId: 10,
      },
      {
        lgaLabel: 'Burutu',
        stateId: 10,
      },
      {
        lgaLabel: 'Ethiope West',
        stateId: 10,
      },
      {
        lgaLabel: 'Ethiope East',
        stateId: 10,
      },
      {
        lgaLabel: 'Ika North East',
        stateId: 10,
      },
      {
        lgaLabel: 'Ika South',
        stateId: 10,
      },
      {
        lgaLabel: 'Isoko North',
        stateId: 10,
      },
      {
        lgaLabel: 'Isoko South',
        stateId: 10,
      },
      {
        lgaLabel: 'Ndokwa East',
        stateId: 10,
      },
      {
        lgaLabel: 'Ndokwa West',
        stateId: 10,
      },
      {
        lgaLabel: 'Okpe',
        stateId: 10,
      },
      {
        lgaLabel: 'Oshimili North',
        stateId: 10,
      },
      {
        lgaLabel: 'Oshimili South',
        stateId: 10,
      },
      {
        lgaLabel: 'Patani',
        stateId: 10,
      },
      {
        lgaLabel: 'Sapele',
        stateId: 10,
      },
      {
        lgaLabel: 'Udu',
        stateId: 10,
      },
      {
        lgaLabel: 'Ughelli North',
        stateId: 10,
      },
      {
        lgaLabel: 'Ukwuani',
        stateId: 10,
      },
      {
        lgaLabel: 'Ughelli South',
        stateId: 10,
      },
      {
        lgaLabel: 'Uvwie',
        stateId: 10,
      },
      {
        lgaLabel: 'Warri North',
        stateId: 10,
      },
      {
        lgaLabel: 'Warri South',
        stateId: 10,
      },
      {
        lgaLabel: 'Warri South West',
        stateId: 10,
      },
      {
        lgaLabel: 'Abakaliki',
        stateId: 11,
      },
      {
        lgaLabel: 'Afikpo North',
        stateId: 11,
      },
      {
        lgaLabel: 'Ebonyi',
        stateId: 11,
      },
      {
        lgaLabel: 'Afikpo South',
        stateId: 11,
      },
      {
        lgaLabel: 'Ezza North',
        stateId: 11,
      },
      {
        lgaLabel: 'Ikwo',
        stateId: 11,
      },
      {
        lgaLabel: 'Ezza South',
        stateId: 11,
      },
      {
        lgaLabel: 'Ivo',
        stateId: 11,
      },
      {
        lgaLabel: 'Ishielu',
        stateId: 11,
      },
      {
        lgaLabel: 'Izzi',
        stateId: 11,
      },
      {
        lgaLabel: 'Ohaozara',
        stateId: 11,
      },
      {
        lgaLabel: 'Ohaukwu',
        stateId: 11,
      },
      {
        lgaLabel: 'Onicha',
        stateId: 11,
      },
      {
        lgaLabel: 'Akoko-Edo',
        stateId: 12,
      },
      {
        lgaLabel: 'Egor',
        stateId: 12,
      },
      {
        lgaLabel: 'Esan Central',
        stateId: 12,
      },
      {
        lgaLabel: 'Esan North-East',
        stateId: 12,
      },
      {
        lgaLabel: 'Esan South-East',
        stateId: 12,
      },
      {
        lgaLabel: 'Esan West',
        stateId: 12,
      },
      {
        lgaLabel: 'Etsako Central',
        stateId: 12,
      },
      {
        lgaLabel: 'Etsako East',
        stateId: 12,
      },
      {
        lgaLabel: 'Etsako West',
        stateId: 12,
      },
      {
        lgaLabel: 'Igueben',
        stateId: 12,
      },
      {
        lgaLabel: 'Ikpoba Okha',
        stateId: 12,
      },
      {
        lgaLabel: 'Orhionmwon',
        stateId: 12,
      },
      {
        lgaLabel: 'Oredo',
        stateId: 12,
      },
      {
        lgaLabel: 'Ovia North-East',
        stateId: 12,
      },
      {
        lgaLabel: 'Ovia South-West',
        stateId: 12,
      },
      {
        lgaLabel: 'Owan East',
        stateId: 12,
      },
      {
        lgaLabel: 'Owan West',
        stateId: 12,
      },
      {
        lgaLabel: 'Uhunmwonde',
        stateId: 12,
      },
      {
        lgaLabel: 'Ado Ekiti',
        stateId: 13,
      },
      {
        lgaLabel: 'Efon',
        stateId: 13,
      },
      {
        lgaLabel: 'Ekiti East',
        stateId: 13,
      },
      {
        lgaLabel: 'Ekiti South-West',
        stateId: 13,
      },
      {
        lgaLabel: 'Ekiti West',
        stateId: 13,
      },
      {
        lgaLabel: 'Emure',
        stateId: 13,
      },
      {
        lgaLabel: 'Gbonyin',
        stateId: 13,
      },
      {
        lgaLabel: 'Ido Osi',
        stateId: 13,
      },
      {
        lgaLabel: 'Ijero',
        stateId: 13,
      },
      {
        lgaLabel: 'Ikere',
        stateId: 13,
      },
      {
        lgaLabel: 'Ilejemeje',
        stateId: 13,
      },
      {
        lgaLabel: 'Irepodun/Ifelodun',
        stateId: 13,
      },
      {
        lgaLabel: 'Ikole',
        stateId: 13,
      },
      {
        lgaLabel: 'Ise/Orun',
        stateId: 13,
      },
      {
        lgaLabel: 'Moba',
        stateId: 13,
      },
      {
        lgaLabel: 'Oye',
        stateId: 13,
      },
      {
        lgaLabel: 'Awgu',
        stateId: 14,
      },
      {
        lgaLabel: 'Aninri',
        stateId: 14,
      },
      {
        lgaLabel: 'Enugu East',
        stateId: 14,
      },
      {
        lgaLabel: 'Enugu North',
        stateId: 14,
      },
      {
        lgaLabel: 'Ezeagu',
        stateId: 14,
      },
      {
        lgaLabel: 'Enugu South',
        stateId: 14,
      },
      {
        lgaLabel: 'Igbo Etiti',
        stateId: 14,
      },
      {
        lgaLabel: 'Igbo Eze North',
        stateId: 14,
      },
      {
        lgaLabel: 'Igbo Eze South',
        stateId: 14,
      },
      {
        lgaLabel: 'Isi Uzo',
        stateId: 14,
      },
      {
        lgaLabel: 'Nkanu East',
        stateId: 14,
      },
      {
        lgaLabel: 'Nkanu West',
        stateId: 14,
      },
      {
        lgaLabel: 'Nsukka',
        stateId: 14,
      },
      {
        lgaLabel: 'Udenu',
        stateId: 14,
      },
      {
        lgaLabel: 'Oji River',
        stateId: 14,
      },
      {
        lgaLabel: 'Uzo Uwani',
        stateId: 14,
      },
      {
        lgaLabel: 'Udi',
        stateId: 14,
      },
      {
        lgaLabel: 'Abaji',
        stateId: 15,
      },
      {
        lgaLabel: 'Bwari',
        stateId: 15,
      },
      {
        lgaLabel: 'Gwagwalada',
        stateId: 15,
      },
      {
        lgaLabel: 'Kuje',
        stateId: 15,
      },
      {
        lgaLabel: 'Kwali',
        stateId: 15,
      },
      {
        lgaLabel: 'Municipal Area Council',
        stateId: 15,
      },
      {
        lgaLabel: 'Akko',
        stateId: 16,
      },
      {
        lgaLabel: 'Balanga',
        stateId: 16,
      },
      {
        lgaLabel: 'Billiri',
        stateId: 16,
      },
      {
        lgaLabel: 'Dukku',
        stateId: 16,
      },
      {
        lgaLabel: 'Funakaye',
        stateId: 16,
      },
      {
        lgaLabel: 'Gombe',
        stateId: 16,
      },
      {
        lgaLabel: 'Kaltungo',
        stateId: 16,
      },
      {
        lgaLabel: 'Kwami',
        stateId: 16,
      },
      {
        lgaLabel: 'Nafada',
        stateId: 16,
      },
      {
        lgaLabel: 'Shongom',
        stateId: 16,
      },
      {
        lgaLabel: 'Yamaltu/Deba',
        stateId: 16,
      },
      {
        lgaLabel: 'Aboh Mbaise',
        stateId: 17,
      },
      {
        lgaLabel: 'Ahiazu Mbaise',
        stateId: 17,
      },
      {
        lgaLabel: 'Ehime Mbano',
        stateId: 17,
      },
      {
        lgaLabel: 'Ezinihitte',
        stateId: 17,
      },
      {
        lgaLabel: 'Ideato North',
        stateId: 17,
      },
      {
        lgaLabel: 'Ideato South',
        stateId: 17,
      },
      {
        lgaLabel: 'Ihitte/Uboma',
        stateId: 17,
      },
      {
        lgaLabel: 'Ikeduru',
        stateId: 17,
      },
      {
        lgaLabel: 'Isiala Mbano',
        stateId: 17,
      },
      {
        lgaLabel: 'Mbaitoli',
        stateId: 17,
      },
      {
        lgaLabel: 'Isu',
        stateId: 17,
      },
      {
        lgaLabel: 'Ngor Okpala',
        stateId: 17,
      },
      {
        lgaLabel: 'Njaba',
        stateId: 17,
      },
      {
        lgaLabel: 'Nkwerre',
        stateId: 17,
      },
      {
        lgaLabel: 'Nwangele',
        stateId: 17,
      },
      {
        lgaLabel: 'Obowo',
        stateId: 17,
      },
      {
        lgaLabel: 'Oguta',
        stateId: 17,
      },
      {
        lgaLabel: 'Ohaji/Egbema',
        stateId: 17,
      },
      {
        lgaLabel: 'Okigwe',
        stateId: 17,
      },
      {
        lgaLabel: 'Orlu',
        stateId: 17,
      },
      {
        lgaLabel: 'Orsu',
        stateId: 17,
      },
      {
        lgaLabel: 'Oru East',
        stateId: 17,
      },
      {
        lgaLabel: 'Oru West',
        stateId: 17,
      },
      {
        lgaLabel: 'Owerri Municipal',
        stateId: 17,
      },
      {
        lgaLabel: 'Owerri North',
        stateId: 17,
      },
      {
        lgaLabel: 'Unuimo',
        stateId: 17,
      },
      {
        lgaLabel: 'Owerri West',
        stateId: 17,
      },
      {
        lgaLabel: 'Auyo',
        stateId: 18,
      },
      {
        lgaLabel: 'Babura',
        stateId: 18,
      },
      {
        lgaLabel: 'Buji',
        stateId: 18,
      },
      {
        lgaLabel: 'Biriniwa',
        stateId: 18,
      },
      {
        lgaLabel: 'Birnin Kud',
        stateId: 18,
      },
      {
        lgaLabel: 'Dutse',
        stateId: 18,
      },
      {
        lgaLabel: 'Gagarawa',
        stateId: 18,
      },
      {
        lgaLabel: 'Garki',
        stateId: 18,
      },
      {
        lgaLabel: 'Gumel',
        stateId: 18,
      },
      {
        lgaLabel: 'Guri',
        stateId: 18,
      },
      {
        lgaLabel: 'Gwaram',
        stateId: 18,
      },
      {
        lgaLabel: 'Gwiwa',
        stateId: 18,
      },
      {
        lgaLabel: 'Hadejia',
        stateId: 18,
      },
      {
        lgaLabel: 'Jahun',
        stateId: 18,
      },
      {
        lgaLabel: 'Kafin Haus',
        stateId: 18,
      },
      {
        lgaLabel: 'Kazaure',
        stateId: 18,
      },
      {
        lgaLabel: 'Kiri Kasam',
        stateId: 18,
      },
      {
        lgaLabel: 'Kiyawa',
        stateId: 18,
      },
      {
        lgaLabel: 'Kaugama',
        stateId: 18,
      },
      {
        lgaLabel: 'Maigatari',
        stateId: 18,
      },
      {
        lgaLabel: 'Malam Mador',
        stateId: 18,
      },
      {
        lgaLabel: 'Miga',
        stateId: 18,
      },
      {
        lgaLabel: 'Sule Tankarka',
        stateId: 18,
      },
      {
        lgaLabel: 'Roni',
        stateId: 17,
      },
      {
        lgaLabel: 'Ringim',
        stateId: 17,
      },
      {
        lgaLabel: 'Yankwashi',
        stateId: 17,
      },
      {
        lgaLabel: 'Taura',
        stateId: 18,
      },
      {
        lgaLabel: 'Birnin Gwari',
        stateId: 19,
      },
      {
        lgaLabel: 'Chikun',
        stateId: 19,
      },
      {
        lgaLabel: 'Giwa',
        stateId: 19,
      },
      {
        lgaLabel: 'Ikara',
        stateId: 19,
      },
      {
        lgaLabel: 'Igabi',
        stateId: 19,
      },
      {
        lgaLabel: 'Jaba',
        stateId: 18,
      },
      {
        lgaLabel: 'Jema-a',
        stateId: 18,
      },
      {
        lgaLabel: 'Kachia',
        stateId: 18,
      },
      {
        lgaLabel: 'Kaduna North',
        stateId: 18,
      },
      {
        lgaLabel: 'Kaduna South',
        stateId: 18,
      },
      {
        lgaLabel: 'Kagarko',
        stateId: 18,
      },
      {
        lgaLabel: 'Kajuru',
        stateId: 18,
      },
      {
        lgaLabel: 'Kaura',
        stateId: 18,
      },
      {
        lgaLabel: 'Kauru',
        stateId: 18,
      },
      {
        lgaLabel: 'Kubau',
        stateId: 18,
      },
      {
        lgaLabel: 'Kudan',
        stateId: 18,
      },
      {
        lgaLabel: 'Lere',
        stateId: 18,
      },
      {
        lgaLabel: 'Makarfi',
        stateId: 18,
      },
      {
        lgaLabel: 'Sabon Gari',
        stateId: 18,
      },
      {
        lgaLabel: 'Sanga',
        stateId: 18,
      },
      {
        lgaLabel: 'Soba',
        stateId: 18,
      },
      {
        lgaLabel: 'Zangon Kataf',
        stateId: 18,
      },
      {
        lgaLabel: 'Zaria',
        stateId: 19,
      },
      {
        lgaLabel: 'Ajingi',
        stateId: 20,
      },
      {
        lgaLabel: 'Albasu',
        stateId: 20,
      },
      {
        lgaLabel: 'Bagwai',
        stateId: 20,
      },
      {
        lgaLabel: 'Bebeji',
        stateId: 20,
      },
      {
        lgaLabel: 'Bichi',
        stateId: 20,
      },
      {
        lgaLabel: 'Bunkure',
        stateId: 20,
      },
      {
        lgaLabel: 'Dala',
        stateId: 20,
      },
      {
        lgaLabel: 'Dambatta',
        stateId: 20,
      },
      {
        lgaLabel: 'Dawakin Kudu',
        stateId: 20,
      },
      {
        lgaLabel: 'Dawakin Tofa',
        stateId: 20,
      },
      {
        lgaLabel: 'Doguwa',
        stateId: 20,
      },
      {
        lgaLabel: 'Fagge',
        stateId: 20,
      },
      {
        lgaLabel: 'Gabasawa',
        stateId: 20,
      },
      {
        lgaLabel: 'Garko',
        stateId: 20,
      },
      {
        lgaLabel: 'Garun Mallam',
        stateId: 20,
      },
      {
        lgaLabel: 'Gezawa',
        stateId: 20,
      },
      {
        lgaLabel: 'Gaya',
        stateId: 20,
      },
      {
        lgaLabel: 'Gwale',
        stateId: 20,
      },
      {
        lgaLabel: 'Gwarzo',
        stateId: 20,
      },
      {
        lgaLabel: 'Kabo',
        stateId: 20,
      },
      {
        lgaLabel: 'Kano Municipal',
        stateId: 20,
      },
      {
        lgaLabel: 'Karaye',
        stateId: 20,
      },
      {
        lgaLabel: 'Kibiya',
        stateId: 20,
      },
      {
        lgaLabel: 'Kiru',
        stateId: 20,
      },
      {
        lgaLabel: 'Kumbotso',
        stateId: 20,
      },
      {
        lgaLabel: 'Kunchi',
        stateId: 20,
      },
      {
        lgaLabel: 'Kura',
        stateId: 20,
      },
      {
        lgaLabel: 'Madobi',
        stateId: 20,
      },
      {
        lgaLabel: 'Makoda',
        stateId: 20,
      },
      {
        lgaLabel: 'Minjibir',
        stateId: 20,
      },
      {
        lgaLabel: 'Nasarawa',
        stateId: 20,
      },
      {
        lgaLabel: 'Rano',
        stateId: 20,
      },
      {
        lgaLabel: 'Rimin Gado',
        stateId: 20,
      },
      {
        lgaLabel: 'Makoda',
        stateId: 20,
      },
      {
        lgaLabel: 'Rogo',
        stateId: 20,
      },
      {
        lgaLabel: 'Shanono',
        stateId: 20,
      },
      {
        lgaLabel: 'Takai',
        stateId: 20,
      },
      {
        lgaLabel: 'Sumaila',
        stateId: 20,
      },
      {
        lgaLabel: 'Tarauni',
        stateId: 20,
      },
      {
        lgaLabel: 'Tofa',
        stateId: 20,
      },
      {
        lgaLabel: 'Tsanyawa',
        stateId: 20,
      },
      {
        lgaLabel: 'Tudun Wada',
        stateId: 20,
      },
      {
        lgaLabel: 'Ungogo',
        stateId: 20,
      },
      {
        lgaLabel: 'Warawa',
        stateId: 20,
      },
      {
        lgaLabel: 'Wudil',
        stateId: 20,
      },
      {
        lgaLabel: 'Bakori',
        stateId: 21,
      },
      {
        lgaLabel: 'Batagarawa',
        stateId: 21,
      },
      {
        lgaLabel: 'Batsari',
        stateId: 21,
      },
      {
        lgaLabel: 'Baure',
        stateId: 21,
      },
      {
        lgaLabel: 'Bindawa',
        stateId: 21,
      },
      {
        lgaLabel: 'Charanchi',
        stateId: 21,
      },
      {
        lgaLabel: 'Danja',
        stateId: 21,
      },
      {
        lgaLabel: 'Dandume',
        stateId: 21,
      },
      {
        lgaLabel: 'Dan Musa',
        stateId: 21,
      },
      {
        lgaLabel: 'Daura',
        stateId: 21,
      },
      {
        lgaLabel: 'Dutsi',
        stateId: 21,
      },
      {
        lgaLabel: 'Dutsin Ma',
        stateId: 21,
      },
      {
        lgaLabel: 'Faskari',
        stateId: 21,
      },
      {
        lgaLabel: 'Funtua',
        stateId: 21,
      },
      {
        lgaLabel: 'Ingawa',
        stateId: 21,
      },
      {
        lgaLabel: 'Jibia',
        stateId: 21,
      },
      {
        lgaLabel: 'Kafur',
        stateId: 21,
      },
      {
        lgaLabel: 'Kaita',
        stateId: 21,
      },
      {
        lgaLabel: 'Kankara',
        stateId: 21,
      },
      {
        lgaLabel: 'Kankia',
        stateId: 21,
      },
      {
        lgaLabel: 'Katsina',
        stateId: 21,
      },
      {
        lgaLabel: 'Kurfi',
        stateId: 21,
      },
      {
        lgaLabel: 'Kusada',
        stateId: 21,
      },
      {
        lgaLabel: 'Mai-Adua',
        stateId: 21,
      },
      {
        lgaLabel: 'Malumfashi',
        stateId: 21,
      },
      {
        lgaLabel: 'Mani',
        stateId: 21,
      },
      {
        lgaLabel: 'Mashi',
        stateId: 21,
      },
      {
        lgaLabel: 'Matazu',
        stateId: 21,
      },
      {
        lgaLabel: 'Musawa',
        stateId: 21,
      },
      {
        lgaLabel: 'Rimi',
        stateId: 21,
      },
      {
        lgaLabel: 'Sabuwa',
        stateId: 21,
      },
      {
        lgaLabel: 'Safana',
        stateId: 21,
      },
      {
        lgaLabel: 'Sandamu',
        stateId: 21,
      },
      {
        lgaLabel: 'Zango',
        stateId: 21,
      },
      {
        lgaLabel: 'Aleiro',
        stateId: 22,
      },
      {
        lgaLabel: 'Argungu',
        stateId: 22,
      },
      {
        lgaLabel: 'Arewa Dandi',
        stateId: 22,
      },
      {
        lgaLabel: 'Augie',
        stateId: 22,
      },
      {
        lgaLabel: 'Bagudo',
        stateId: 22,
      },
      {
        lgaLabel: 'Birnin Kebbi',
        stateId: 22,
      },
      {
        lgaLabel: 'Bunza',
        stateId: 22,
      },
      {
        lgaLabel: 'Dandi',
        stateId: 22,
      },
      {
        lgaLabel: 'Fakai',
        stateId: 22,
      },
      {
        lgaLabel: 'Gwandu',
        stateId: 22,
      },
      {
        lgaLabel: 'Jega',
        stateId: 22,
      },
      {
        lgaLabel: 'Kalgo',
        stateId: 22,
      },
      {
        lgaLabel: 'Koko/Besse',
        stateId: 22,
      },
      {
        lgaLabel: 'Maiyama',
        stateId: 22,
      },
      {
        lgaLabel: 'Ngaski',
        stateId: 22,
      },
      {
        lgaLabel: 'Shanga',
        stateId: 22,
      },
      {
        lgaLabel: 'Suru',
        stateId: 22,
      },
      {
        lgaLabel: 'Sakaba',
        stateId: 22,
      },
      {
        lgaLabel: 'Wasagu/Danko',
        stateId: 22,
      },
      {
        lgaLabel: 'Yauri',
        stateId: 22,
      },
      {
        lgaLabel: 'Zuru',
        stateId: 22,
      },
      {
        lgaLabel: 'Ajaokuta',
        stateId: 23,
      },
      {
        lgaLabel: 'Adavi',
        stateId: 23,
      },
      {
        lgaLabel: 'Ankpa',
        stateId: 23,
      },
      {
        lgaLabel: 'Dekina',
        stateId: 23,
      },
      {
        lgaLabel: 'Ibaji',
        stateId: 23,
      },
      {
        lgaLabel: 'Idah',
        stateId: 23,
      },
      {
        lgaLabel: 'Igalamela Odolu',
        stateId: 23,
      },
      {
        lgaLabel: 'Ijumu',
        stateId: 23,
      },
      {
        lgaLabel: 'Kabba/Bunu',
        stateId: 23,
      },
      {
        lgaLabel: 'Kogi',
        stateId: 23,
      },
      {
        lgaLabel: 'Lokoja',
        stateId: 23,
      },
      {
        lgaLabel: 'Ofu',
        stateId: 23,
      },
      {
        lgaLabel: 'Mopa Muro',
        stateId: 23,
      },
      {
        lgaLabel: 'Ogori/Magongo',
        stateId: 23,
      },
      {
        lgaLabel: 'Okehi',
        stateId: 23,
      },
      {
        lgaLabel: 'Okene',
        stateId: 23,
      },
      {
        lgaLabel: 'Olamaboro',
        stateId: 23,
      },
      {
        lgaLabel: 'Omala',
        stateId: 23,
      },
      {
        lgaLabel: 'Yagba East',
        stateId: 23,
      },
      {
        lgaLabel: 'Yagba West',
        stateId: 23,
      },
      {
        lgaLabel: 'Asa',
        stateId: 24,
      },
      {
        lgaLabel: 'Baruten',
        stateId: 24,
      },
      {
        lgaLabel: 'Edu',
        stateId: 24,
      },
      {
        lgaLabel: 'Ilorin East',
        stateId: 24,
      },
      {
        lgaLabel: 'Ifelodun',
        stateId: 24,
      },
      {
        lgaLabel: 'Ilorin South',
        stateId: 24,
      },
      {
        lgaLabel: 'Ekiti Kwara State',
        stateId: 24,
      },
      {
        lgaLabel: 'Ilorin West',
        stateId: 24,
      },
      {
        lgaLabel: 'Irepodun',
        stateId: 24,
      },
      {
        lgaLabel: 'Isin',
        stateId: 24,
      },
      {
        lgaLabel: 'Kaiama',
        stateId: 24,
      },
      {
        lgaLabel: 'Moro',
        stateId: 24,
      },
      {
        lgaLabel: 'Offa',
        stateId: 24,
      },
      {
        lgaLabel: 'Oke Ero',
        stateId: 24,
      },
      {
        lgaLabel: 'Oyun',
        stateId: 24,
      },
      {
        lgaLabel: 'Pategi',
        stateId: 24,
      },
      {
        lgaLabel: 'Akwanga',
        stateId: 26,
      },
      {
        lgaLabel: 'Awe',
        stateId: 26,
      },
      {
        lgaLabel: 'Doma',
        stateId: 26,
      },
      {
        lgaLabel: 'Karu',
        stateId: 26,
      },
      {
        lgaLabel: 'Keana',
        stateId: 26,
      },
      {
        lgaLabel: 'Keffi',
        stateId: 26,
      },
      {
        lgaLabel: 'Lafia',
        stateId: 26,
      },
      {
        lgaLabel: 'Kokona',
        stateId: 26,
      },
      {
        lgaLabel: 'Nasarawa Egon',
        stateId: 26,
      },
      {
        lgaLabel: 'Nasarawa',
        stateId: 26,
      },
      {
        lgaLabel: 'Obi',
        stateId: 26,
      },
      {
        lgaLabel: 'Toto',
        stateId: 26,
      },
      {
        lgaLabel: 'Wamba',
        stateId: 26,
      },
      {
        lgaLabel: 'Agaie',
        stateId: 27,
      },
      {
        lgaLabel: 'Agwara',
        stateId: 27,
      },
      {
        lgaLabel: 'Bida',
        stateId: 27,
      },
      {
        lgaLabel: 'Borgu',
        stateId: 27,
      },
      {
        lgaLabel: 'Bosso',
        stateId: 27,
      },
      {
        lgaLabel: 'Chanchaga',
        stateId: 27,
      },
      {
        lgaLabel: 'Edati',
        stateId: 27,
      },
      {
        lgaLabel: 'Gbako',
        stateId: 27,
      },
      {
        lgaLabel: 'Gurara',
        stateId: 27,
      },
      {
        lgaLabel: 'Katcha',
        stateId: 27,
      },
      {
        lgaLabel: 'Kontagora',
        stateId: 27,
      },
      {
        lgaLabel: 'Lapai',
        stateId: 27,
      },
      {
        lgaLabel: 'Lavun',
        stateId: 27,
      },
      {
        lgaLabel: 'Mariga',
        stateId: 27,
      },
      {
        lgaLabel: 'Magama',
        stateId: 27,
      },
      {
        lgaLabel: 'Mokwa',
        stateId: 27,
      },
      {
        lgaLabel: 'Mashegu',
        stateId: 27,
      },
      {
        lgaLabel: 'Moya',
        stateId: 27,
      },
      {
        lgaLabel: 'Paikoro',
        stateId: 27,
      },
      {
        lgaLabel: 'Rafi',
        stateId: 27,
      },
      {
        lgaLabel: 'Rijau',
        stateId: 27,
      },
      {
        lgaLabel: 'Shiroro',
        stateId: 27,
      },
      {
        lgaLabel: 'Suleja',
        stateId: 27,
      },
      {
        lgaLabel: 'Tafa',
        stateId: 27,
      },
      {
        lgaLabel: 'Wushishi',
        stateId: 27,
      },
      {
        lgaLabel: 'Abeokuta North',
        stateId: 28,
      },
      {
        lgaLabel: 'Abeokuta South',
        stateId: 28,
      },
      {
        lgaLabel: 'Ado-Odo/Ota',
        stateId: 28,
      },
      {
        lgaLabel: 'Egbado North',
        stateId: 28,
      },
      {
        lgaLabel: 'Ewekoro',
        stateId: 28,
      },
      {
        lgaLabel: 'Egbado South',
        stateId: 28,
      },
      {
        lgaLabel: 'Ijebu North',
        stateId: 28,
      },
      {
        lgaLabel: 'Ijebu East',
        stateId: 28,
      },
      {
        lgaLabel: 'Ifo',
        stateId: 28,
      },
      {
        lgaLabel: 'Ijebu Ode',
        stateId: 28,
      },
      {
        lgaLabel: 'Ijebu North East',
        stateId: 28,
      },
      {
        lgaLabel: 'Imeko Afon',
        stateId: 28,
      },
      {
        lgaLabel: 'Ikenne',
        stateId: 28,
      },
      {
        lgaLabel: 'Ipokia',
        stateId: 28,
      },
      {
        lgaLabel: 'Odeda',
        stateId: 28,
      },
      {
        lgaLabel: 'Obafemi Owode',
        stateId: 28,
      },
      {
        lgaLabel: 'Odogbolu',
        stateId: 28,
      },
      {
        lgaLabel: 'Remo North',
        stateId: 28,
      },
      {
        lgaLabel: 'Ogun Waterside',
        stateId: 28,
      },
      {
        lgaLabel: 'Shagamu',
        stateId: 28,
      },
      {
        lgaLabel: 'Akoko North-East',
        stateId: 29,
      },
      {
        lgaLabel: 'Akoko North-West',
        stateId: 29,
      },
      {
        lgaLabel: 'Akoko South-West',
        stateId: 29,
      },
      {
        lgaLabel: 'Akoko South-East',
        stateId: 29,
      },
      {
        lgaLabel: 'Akure North',
        stateId: 29,
      },
      {
        lgaLabel: 'Akure South',
        stateId: 29,
      },
      {
        lgaLabel: 'Ese Odo',
        stateId: 29,
      },
      {
        lgaLabel: 'Idanre',
        stateId: 29,
      },
      {
        lgaLabel: 'Ifedore',
        stateId: 29,
      },
      {
        lgaLabel: 'Ilaje',
        stateId: 29,
      },
      {
        lgaLabel: 'Irele',
        stateId: 29,
      },
      {
        lgaLabel: 'Ile Oluji/Okeigbo',
        stateId: 29,
      },
      {
        lgaLabel: 'Odigbo',
        stateId: 29,
      },
      {
        lgaLabel: 'Okitipupa',
        stateId: 29,
      },
      {
        lgaLabel: 'Ondo West',
        stateId: 29,
      },
      {
        lgaLabel: 'Ose',
        stateId: 29,
      },
      {
        lgaLabel: 'Ondo East',
        stateId: 29,
      },
      {
        lgaLabel: 'Owo',
        stateId: 29,
      },
      {
        lgaLabel: 'Aiyedire',
        stateId: 30,
      },
      {
        lgaLabel: 'Atakunmosa West',
        stateId: 30,
      },
      {
        lgaLabel: 'Atakunmosa East',
        stateId: 30,
      },
      {
        lgaLabel: 'Aiyedaade',
        stateId: 30,
      },
      {
        lgaLabel: 'Boluwaduro',
        stateId: 30,
      },
      {
        lgaLabel: 'Boripe',
        stateId: 30,
      },
      {
        lgaLabel: 'Ife East',
        stateId: 30,
      },
      {
        lgaLabel: 'Ede South',
        stateId: 30,
      },
      {
        lgaLabel: 'Ife North',
        stateId: 30,
      },
      {
        lgaLabel: 'Ede North',
        stateId: 30,
      },
      {
        lgaLabel: 'Ife South',
        stateId: 30,
      },
      {
        lgaLabel: 'Ejigbo',
        stateId: 30,
      },
      {
        lgaLabel: 'Ife Central',
        stateId: 30,
      },
      {
        lgaLabel: 'Ifedayo',
        stateId: 30,
      },
      {
        lgaLabel: 'Egbedore',
        stateId: 30,
      },
      {
        lgaLabel: 'Ila',
        stateId: 30,
      },
      {
        lgaLabel: 'Ifelodun',
        stateId: 30,
      },
      {
        lgaLabel: 'Ilesa East',
        stateId: 30,
      },
      {
        lgaLabel: 'Ilesa West',
        stateId: 30,
      },
      {
        lgaLabel: 'Irepodun',
        stateId: 30,
      },
      {
        lgaLabel: 'Irewole',
        stateId: 30,
      },
      {
        lgaLabel: 'Isokan',
        stateId: 30,
      },
      {
        lgaLabel: 'Iwo',
        stateId: 30,
      },
      {
        lgaLabel: 'Obokun',
        stateId: 30,
      },
      {
        lgaLabel: 'Odo Otin',
        stateId: 30,
      },
      {
        lgaLabel: 'Ola Oluwa',
        stateId: 30,
      },
      {
        lgaLabel: 'Olorunda',
        stateId: 30,
      },
      {
        lgaLabel: 'Oriade',
        stateId: 30,
      },
      {
        lgaLabel: 'Orolu',
        stateId: 30,
      },
      {
        lgaLabel: 'Osogbo',
        stateId: 30,
      },
      {
        lgaLabel: 'Afijio',
        stateId: 31,
      },
      {
        lgaLabel: 'Akinyele',
        stateId: 31,
      },
      {
        lgaLabel: 'Atiba',
        stateId: 31,
      },
      {
        lgaLabel: 'Atisbo',
        stateId: 31,
      },
      {
        lgaLabel: 'Egbeda',
        stateId: 31,
      },
      {
        lgaLabel: 'Ibadan North',
        stateId: 31,
      },
      {
        lgaLabel: 'Ibadan North-East',
        stateId: 31,
      },
      {
        lgaLabel: 'Ibadan North-West',
        stateId: 31,
      },
      {
        lgaLabel: 'Ibadan South-East',
        stateId: 31,
      },
      {
        lgaLabel: 'Ibarapa Central',
        stateId: 31,
      },
      {
        lgaLabel: 'Ibadan South-West',
        stateId: 31,
      },
      {
        lgaLabel: 'Ibarapa East',
        stateId: 31,
      },
      {
        lgaLabel: 'Ido',
        stateId: 31,
      },
      {
        lgaLabel: 'Ibarapa North',
        stateId: 31,
      },
      {
        lgaLabel: 'Irepo',
        stateId: 31,
      },
      {
        lgaLabel: 'Iseyin',
        stateId: 31,
      },
      {
        lgaLabel: 'Itesiwaju',
        stateId: 31,
      },
      {
        lgaLabel: 'Iwajowa',
        stateId: 31,
      },
      {
        lgaLabel: 'Kajola',
        stateId: 31,
      },
      {
        lgaLabel: 'Lagelu',
        stateId: 31,
      },
      {
        lgaLabel: 'Ogbomosho North',
        stateId: 31,
      },
      {
        lgaLabel: 'Ogbomosho South',
        stateId: 31,
      },
      {
        lgaLabel: 'Ogo Oluwa',
        stateId: 31,
      },
      {
        lgaLabel: 'Olorunsogo',
        stateId: 31,
      },
      {
        lgaLabel: 'Oluyole',
        stateId: 31,
      },
      {
        lgaLabel: 'Ona Ara',
        stateId: 31,
      },
      {
        lgaLabel: 'Orelope',
        stateId: 31,
      },
      {
        lgaLabel: 'Ori Ire',
        stateId: 31,
      },
      {
        lgaLabel: 'Oyo',
        stateId: 31,
      },
      {
        lgaLabel: 'Oyo East',
        stateId: 31,
      },
      {
        lgaLabel: 'Saki East',
        stateId: 31,
      },
      {
        lgaLabel: 'Saki West',
        stateId: 31,
      },
      {
        lgaLabel: 'Surulere Oyo State',
        stateId: 31,
      },
      {
        lgaLabel: 'Bokkos',
        stateId: 32,
      },
      {
        lgaLabel: 'Barkin Ladi',
        stateId: 32,
      },
      {
        lgaLabel: 'Bassa',
        stateId: 32,
      },
      {
        lgaLabel: 'Jos East',
        stateId: 32,
      },
      {
        lgaLabel: 'Jos North',
        stateId: 32,
      },
      {
        lgaLabel: 'Jos South',
        stateId: 32,
      },
      {
        lgaLabel: 'Kanam',
        stateId: 32,
      },
      {
        lgaLabel: 'Kanke',
        stateId: 32,
      },
      {
        lgaLabel: 'Langtang South',
        stateId: 32,
      },
      {
        lgaLabel: 'Langtang North',
        stateId: 32,
      },
      {
        lgaLabel: 'Mangu',
        stateId: 32,
      },
      {
        lgaLabel: 'Mikang',
        stateId: 32,
      },
      {
        lgaLabel: 'Pankshin',
        stateId: 32,
      },
      {
        lgaLabel: 'Qua-an Pan',
        stateId: 32,
      },
      {
        lgaLabel: 'Riyom',
        stateId: 32,
      },
      {
        lgaLabel: 'Shendam',
        stateId: 32,
      },
      {
        lgaLabel: 'Wase',
        stateId: 32,
      },
      {
        lgaLabel: 'Abua–Odual',
        stateId: 33,
      },
      {
        lgaLabel: 'Ahoada East',
        stateId: 33,
      },
      {
        lgaLabel: 'Ahoada West',
        stateId: 33,
      },
      {
        lgaLabel: 'Akuku-Toru',
        stateId: 33,
      },
      {
        lgaLabel: 'Asari-Toru',
        stateId: 33,
      },
      {
        lgaLabel: 'Andoni',
        stateId: 33,
      },
      {
        lgaLabel: 'Bonny',
        stateId: 33,
      },
      {
        lgaLabel: 'Degema',
        stateId: 33,
      },
      {
        lgaLabel: 'Eleme',
        stateId: 33,
      },
      {
        lgaLabel: 'Emohua',
        stateId: 33,
      },
      {
        lgaLabel: 'Etche',
        stateId: 33,
      },
      {
        lgaLabel: 'Gokana',
        stateId: 33,
      },
      {
        lgaLabel: 'Ikwerre',
        stateId: 33,
      },
      {
        lgaLabel: 'Khana',
        stateId: 33,
      },
      {
        lgaLabel: 'Obio-Akpor',
        stateId: 33,
      },
      {
        lgaLabel: 'Ogba–Egbema–Ndoni',
        stateId: 33,
      },
      {
        lgaLabel: 'Ogu–Bolo',
        stateId: 33,
      },
      {
        lgaLabel: 'Okrika',
        stateId: 33,
      },
      {
        lgaLabel: 'Omuma',
        stateId: 33,
      },
      {
        lgaLabel: 'Opobo–Nkoro',
        stateId: 33,
      },
      {
        lgaLabel: 'Oyigbo',
        stateId: 33,
      },
      {
        lgaLabel: 'Port Harcourt',
        stateId: 33,
      },
      {
        lgaLabel: 'Tai',
        stateId: 33,
      },
      {
        lgaLabel: 'Gudu',
        stateId: 34,
      },
      {
        lgaLabel: 'Gwadabawa',
        stateId: 34,
      },
      {
        lgaLabel: 'Illela',
        stateId: 34,
      },
      {
        lgaLabel: 'Isa',
        stateId: 34,
      },
      {
        lgaLabel: 'Kebbe',
        stateId: 34,
      },
      {
        lgaLabel: 'Kware',
        stateId: 34,
      },
      {
        lgaLabel: 'Rabah',
        stateId: 34,
      },
      {
        lgaLabel: 'Sabon Birni',
        stateId: 34,
      },
      {
        lgaLabel: 'Shagari',
        stateId: 34,
      },
      {
        lgaLabel: 'Silame',
        stateId: 34,
      },
      {
        lgaLabel: 'Sokoto North',
        stateId: 34,
      },
      {
        lgaLabel: 'Sokoto South',
        stateId: 34,
      },
      {
        lgaLabel: 'Tambuwal',
        stateId: 34,
      },
      {
        lgaLabel: 'Tangaza',
        stateId: 34,
      },
      {
        lgaLabel: 'Tureta',
        stateId: 34,
      },
      {
        lgaLabel: 'Wamako',
        stateId: 34,
      },
      {
        lgaLabel: 'Wurno',
        stateId: 34,
      },
      {
        lgaLabel: 'Yabo',
        stateId: 34,
      },
      {
        lgaLabel: 'Binji',
        stateId: 34,
      },
      {
        lgaLabel: 'Bodinga',
        stateId: 34,
      },
      {
        lgaLabel: 'Dange Shuni',
        stateId: 34,
      },
      {
        lgaLabel: 'Goronyo',
        stateId: 34,
      },
      {
        lgaLabel: 'Gada',
        stateId: 34,
      },
      {
        lgaLabel: 'Ardo Kola',
        stateId: 35,
      },
      {
        lgaLabel: 'Bali',
        stateId: 35,
      },
      {
        lgaLabel: 'Donga',
        stateId: 35,
      },
      {
        lgaLabel: 'Gashaka',
        stateId: 35,
      },
      {
        lgaLabel: 'Gassol',
        stateId: 35,
      },
      {
        lgaLabel: 'Ibi',
        stateId: 35,
      },
      {
        lgaLabel: 'Jalingo',
        stateId: 35,
      },
      {
        lgaLabel: 'Karim Lamido',
        stateId: 35,
      },
      {
        lgaLabel: 'Kumi',
        stateId: 35,
      },
      {
        lgaLabel: 'Lau',
        stateId: 35,
      },
      {
        lgaLabel: 'Sardauna',
        stateId: 35,
      },
      {
        lgaLabel: 'Takum',
        stateId: 35,
      },
      {
        lgaLabel: 'Ussa',
        stateId: 35,
      },
      {
        lgaLabel: 'Wukari',
        stateId: 35,
      },
      {
        lgaLabel: 'Yorro',
        stateId: 35,
      },
      {
        lgaLabel: 'Zing',
        stateId: 35,
      },
      {
        lgaLabel: 'Bade',
        stateId: 36,
      },
      {
        lgaLabel: 'Bursari',
        stateId: 36,
      },
      {
        lgaLabel: 'Damaturu',
        stateId: 36,
      },
      {
        lgaLabel: 'fika',
        stateId: 36,
      },
      {
        lgaLabel: 'Fune',
        stateId: 36,
      },
      {
        lgaLabel: 'Geidam',
        stateId: 36,
      },
      {
        lgaLabel: 'Gujba',
        stateId: 36,
      },
      {
        lgaLabel: 'Gulani',
        stateId: 36,
      },
      {
        lgaLabel: 'Jakusko',
        stateId: 36,
      },
      {
        lgaLabel: 'Karasuwa',
        stateId: 36,
      },
      {
        lgaLabel: 'Machina',
        stateId: 36,
      },
      {
        lgaLabel: 'Nangere',
        stateId: 36,
      },
      {
        lgaLabel: 'Nguru',
        stateId: 36,
      },
      {
        lgaLabel: 'Potiskum',
        stateId: 36,
      },
      {
        lgaLabel: 'Tarmuwa',
        stateId: 36,
      },
      {
        lgaLabel: 'Yunusari',
        stateId: 36,
      },
      {
        lgaLabel: 'Anka',
        stateId: 37,
      },
      {
        lgaLabel: 'Birnin Magaji/Kiyaw',
        stateId: 37,
      },
      {
        lgaLabel: 'Bakura',
        stateId: 37,
      },
      {
        lgaLabel: 'Bukkuyum',
        stateId: 37,
      },
      {
        lgaLabel: 'Bungudu',
        stateId: 37,
      },
      {
        lgaLabel: 'Gummi',
        stateId: 37,
      },
      {
        lgaLabel: 'Gusau',
        stateId: 37,
      },
      {
        lgaLabel: 'Kaura Namoda',
        stateId: 37,
      },
      {
        lgaLabel: 'Maradun',
        stateId: 37,
      },
      {
        lgaLabel: 'Shinkafi',
        stateId: 37,
      },
      {
        lgaLabel: 'Maru',
        stateId: 37,
      },
      {
        lgaLabel: 'Talata Mafara',
        stateId: 37,
      },
      {
        lgaLabel: 'Tsafe',
        stateId: 37,
      },
      {
        lgaLabel: 'Zurmi',
        stateId: 37,
      },
    ]
    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')

    await SettingsLga.truncate()
    await SettingsLga.createMany(lgasData)

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
