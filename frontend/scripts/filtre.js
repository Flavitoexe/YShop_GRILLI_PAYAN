function displayFilter() {
    // 1. Le conteneur principal du formulaire
    const form_filtre = document.createElement('form')
    form_filtre.className = "form_filtre"

    // SECTION FAMILLE
    const div_famille = document.createElement('div')
    div_famille.className = "div_filtre_section"

    const titre_famille = document.createElement('h4')
    titre_famille.className = "titre_section_filtre"
    titre_famille.textContent = "Famille"

    const label_famille_cordes = document.createElement('label')
    label_famille_cordes.className = "label_famille"

    const check_famille_cordes = document.createElement('input')
    check_famille_cordes.type = "checkbox"
    check_famille_cordes.className = "check_famille"
    check_famille_cordes.id = "famille_cordes"

    const texte_famille_cordes = document.createElement('span')
    texte_famille_cordes.className = "texte_famille"
    texte_famille_cordes.textContent = " Cordes"

    label_famille_cordes.appendChild(check_famille_cordes)
    label_famille_cordes.appendChild(texte_famille_cordes)

    const label_famille_cuivres = document.createElement('label')
    label_famille_cuivres.className = "label_famille"

    const check_famille_cuivres = document.createElement('input')
    check_famille_cuivres.type = "checkbox"
    check_famille_cuivres.className = "check_famille"
    check_famille_cuivres.id = "famille_cuivres"

    const texte_famille_cuivres = document.createElement('span')
    texte_famille_cuivres.className = "texte_famille"
    texte_famille_cuivres.textContent = " Cuivres"

    label_famille_cuivres.appendChild(check_famille_cuivres)
    label_famille_cuivres.appendChild(texte_famille_cuivres)

    const label_famille_percussions = document.createElement('label')
    label_famille_percussions.className = "label_famille"

    const check_famille_percussions = document.createElement('input')
    check_famille_percussions.type = "checkbox"
    check_famille_percussions.className = "check_famille"
    check_famille_percussions.id = "famille_percussions"

    const texte_famille_percussions = document.createElement('span')
    texte_famille_percussions.className = "texte_famille"
    texte_famille_percussions.textContent = " Percussions"

    label_famille_percussions.appendChild(check_famille_percussions)
    label_famille_percussions.appendChild(texte_famille_percussions)

    // Assemblage de la section Famille
    div_famille.appendChild(titre_famille)
    div_famille.appendChild(label_famille_cordes)
    div_famille.appendChild(label_famille_cuivres)
    div_famille.appendChild(label_famille_percussions) 

    // SECTION INSTRUMENT
    const div_instrument = document.createElement('div')
    div_instrument.className = "div_filtre_section"

    const titre_instrument = document.createElement('h4')
    titre_instrument.className = "titre_section_filtre"
    titre_instrument.textContent = "Instrument"

    const label_inst_banjos = document.createElement('label')
    label_inst_banjos.className = "label_instrument"
    const check_inst_banjos = document.createElement('input')
    check_inst_banjos.type = "checkbox"
    check_inst_banjos.className = "check_instrument"
    check_inst_banjos.id = "instrument_banjos"
    const texte_inst_banjos = document.createElement('span')
    texte_inst_banjos.className = "texte_instrument"
    texte_inst_banjos.textContent = " Banjos"
    label_inst_banjos.appendChild(check_inst_banjos)
    label_inst_banjos.appendChild(texte_inst_banjos)

    const label_inst_basses = document.createElement('label')
    label_inst_basses.className = "label_instrument"
    const check_inst_basses = document.createElement('input')
    check_inst_basses.type = "checkbox"
    check_inst_basses.className = "check_instrument"
    check_inst_basses.id = "instrument_basses"
    const texte_inst_basses = document.createElement('span')
    texte_inst_basses.className = "texte_instrument"
    texte_inst_basses.textContent = " Basses"
    label_inst_basses.appendChild(check_inst_basses)
    label_inst_basses.appendChild(texte_inst_basses)

    const label_inst_batteries = document.createElement('label')
    label_inst_batteries.className = "label_instrument"
    const check_inst_batteries = document.createElement('input')
    check_inst_batteries.type = "checkbox"
    check_inst_batteries.className = "check_instrument"
    check_inst_batteries.id = "instrument_batteries"
    const texte_inst_batteries = document.createElement('span')
    texte_inst_batteries.className = "texte_instrument"
    texte_inst_batteries.textContent = " Batteries"
    label_inst_batteries.appendChild(check_inst_batteries)
    label_inst_batteries.appendChild(texte_inst_batteries)

    const label_inst_clarinettes = document.createElement('label')
    label_inst_clarinettes.className = "label_instrument"
    const check_inst_clarinettes = document.createElement('input')
    check_inst_clarinettes.type = "checkbox"
    check_inst_clarinettes.className = "check_instrument"
    check_inst_clarinettes.id = "instrument_clarinettes"
    const texte_inst_clarinettes = document.createElement('span')
    texte_inst_clarinettes.className = "texte_instrument"
    texte_inst_clarinettes.textContent = " Clarinettes"
    label_inst_clarinettes.appendChild(check_inst_clarinettes)
    label_inst_clarinettes.appendChild(texte_inst_clarinettes)

    const label_inst_contrebasses = document.createElement('label')
    label_inst_contrebasses.className = "label_instrument"
    const check_inst_contrebasses = document.createElement('input')
    check_inst_contrebasses.type = "checkbox"
    check_inst_contrebasses.className = "check_instrument"
    check_inst_contrebasses.id = "instrument_contrebasses"
    const texte_inst_contrebasses = document.createElement('span')
    texte_inst_contrebasses.className = "texte_instrument"
    texte_inst_contrebasses.textContent = " Contrebasses"
    label_inst_contrebasses.appendChild(check_inst_contrebasses)
    label_inst_contrebasses.appendChild(texte_inst_contrebasses)

    const label_inst_djembes = document.createElement('label')
    label_inst_djembes.className = "label_instrument"
    const check_inst_djembes = document.createElement('input')
    check_inst_djembes.type = "checkbox"
    check_inst_djembes.className = "check_instrument"
    check_inst_djembes.id = "instrument_djembes"
    const texte_inst_djembes = document.createElement('span')
    texte_inst_djembes.className = "texte_instrument"
    texte_inst_djembes.textContent = " Djembés"
    label_inst_djembes.appendChild(check_inst_djembes)
    label_inst_djembes.appendChild(texte_inst_djembes)

    const label_inst_guitares_elec = document.createElement('label')
    label_inst_guitares_elec.className = "label_instrument"
    const check_inst_guitares_elec = document.createElement('input')
    check_inst_guitares_elec.type = "checkbox"
    check_inst_guitares_elec.className = "check_instrument"
    check_inst_guitares_elec.id = "instrument_guitares_elec"
    const texte_inst_guitares_elec = document.createElement('span')
    texte_inst_guitares_elec.className = "texte_instrument"
    texte_inst_guitares_elec.textContent = " Guitares électriques"
    label_inst_guitares_elec.appendChild(check_inst_guitares_elec)
    label_inst_guitares_elec.appendChild(texte_inst_guitares_elec)

    const label_inst_guitares_seches = document.createElement('label')
    label_inst_guitares_seches.className = "label_instrument"
    const check_inst_guitares_seches = document.createElement('input')
    check_inst_guitares_seches.type = "checkbox"
    check_inst_guitares_seches.className = "check_instrument"
    check_inst_guitares_seches.id = "instrument_guitares_seches"
    const texte_inst_guitares_seches = document.createElement('span')
    texte_inst_guitares_seches.className = "texte_instrument"
    texte_inst_guitares_seches.textContent = " Guitares sèches"
    label_inst_guitares_seches.appendChild(check_inst_guitares_seches)
    label_inst_guitares_seches.appendChild(texte_inst_guitares_seches)

    const label_inst_harpes = document.createElement('label')
    label_inst_harpes.className = "label_instrument"
    const check_inst_harpes = document.createElement('input')
    check_inst_harpes.type = "checkbox"
    check_inst_harpes.className = "check_instrument"
    check_inst_harpes.id = "instrument_harpes"
    const texte_inst_harpes = document.createElement('span')
    texte_inst_harpes.className = "texte_instrument"
    texte_inst_harpes.textContent = " Harpes"
    label_inst_harpes.appendChild(check_inst_harpes)
    label_inst_harpes.appendChild(texte_inst_harpes)

    const label_inst_mandolines = document.createElement('label')
    label_inst_mandolines.className = "label_instrument"
    const check_inst_mandolines = document.createElement('input')
    check_inst_mandolines.type = "checkbox"
    check_inst_mandolines.className = "check_instrument"
    check_inst_mandolines.id = "instrument_mandolines"
    const texte_inst_mandolines = document.createElement('span')
    texte_inst_mandolines.className = "texte_instrument"
    texte_inst_mandolines.textContent = " Mandolines"
    label_inst_mandolines.appendChild(check_inst_mandolines)
    label_inst_mandolines.appendChild(texte_inst_mandolines)

    const label_inst_maracas = document.createElement('label')
    label_inst_maracas.className = "label_instrument"
    const check_inst_maracas = document.createElement('input')
    check_inst_maracas.type = "checkbox"
    check_inst_maracas.className = "check_instrument"
    check_inst_maracas.id = "instrument_maracas"
    const texte_inst_maracas = document.createElement('span')
    texte_inst_maracas.className = "texte_instrument"
    texte_inst_maracas.textContent = " Maracas"
    label_inst_maracas.appendChild(check_inst_maracas)
    label_inst_maracas.appendChild(texte_inst_maracas)

    const label_inst_saxophones = document.createElement('label')
    label_inst_saxophones.className = "label_instrument"
    const check_inst_saxophones = document.createElement('input')
    check_inst_saxophones.type = "checkbox"
    check_inst_saxophones.className = "check_instrument"
    check_inst_saxophones.id = "instrument_saxophones"
    const texte_inst_saxophones = document.createElement('span')
    texte_inst_saxophones.className = "texte_instrument"
    texte_inst_saxophones.textContent = " Saxophones"
    label_inst_saxophones.appendChild(check_inst_saxophones)
    label_inst_saxophones.appendChild(texte_inst_saxophones)

    const label_inst_trompettes = document.createElement('label')
    label_inst_trompettes.className = "label_instrument"
    const check_inst_trompettes = document.createElement('input')
    check_inst_trompettes.type = "checkbox"
    check_inst_trompettes.className = "check_instrument"
    check_inst_trompettes.id = "instrument_trompettes"
    const texte_inst_trompettes = document.createElement('span')
    texte_inst_trompettes.className = "texte_instrument"
    texte_inst_trompettes.textContent = " Trompettes"
    label_inst_trompettes.appendChild(check_inst_trompettes)
    label_inst_trompettes.appendChild(texte_inst_trompettes)

    const label_inst_violons = document.createElement('label')
    label_inst_violons.className = "label_instrument"
    const check_inst_violons = document.createElement('input')
    check_inst_violons.type = "checkbox"
    check_inst_violons.className = "check_instrument"
    check_inst_violons.id = "instrument_violons"
    const texte_inst_violons = document.createElement('span')
    texte_inst_violons.className = "texte_instrument"
    texte_inst_violons.textContent = " Violons"
    label_inst_violons.appendChild(check_inst_violons)
    label_inst_violons.appendChild(texte_inst_violons)

    // ASSEMBLAGE DE LA SECTION INSTRUMENT 
    div_instrument.appendChild(titre_instrument)
    div_instrument.appendChild(label_inst_banjos)
    div_instrument.appendChild(label_inst_basses)
    div_instrument.appendChild(label_inst_batteries)
    div_instrument.appendChild(label_inst_clarinettes)
    div_instrument.appendChild(label_inst_contrebasses)
    div_instrument.appendChild(label_inst_djembes)
    div_instrument.appendChild(label_inst_guitares_elec)
    div_instrument.appendChild(label_inst_guitares_seches)
    div_instrument.appendChild(label_inst_harpes)
    div_instrument.appendChild(label_inst_mandolines)
    div_instrument.appendChild(label_inst_maracas)
    div_instrument.appendChild(label_inst_saxophones)
    div_instrument.appendChild(label_inst_trompettes)
    div_instrument.appendChild(label_inst_violons)

    // SECTION MARQUE
    const div_marque = document.createElement('div')
    div_marque.className = "div_filtre_section"

    const titre_marque = document.createElement('h4')
    titre_marque.className = "titre_section_filtre"
    titre_marque.textContent = "Marque"

    const label_mrq_afroton = document.createElement('label')
    label_mrq_afroton.className = "label_marque"
    const check_mrq_afroton = document.createElement('input')
    check_mrq_afroton.type = "checkbox"
    check_mrq_afroton.className = "check_marque"
    check_mrq_afroton.id = "marque_afroton"
    const texte_mrq_afroton = document.createElement('span')
    texte_mrq_afroton.className = "texte_marque"
    texte_mrq_afroton.textContent = " Afroton"
    label_mrq_afroton.appendChild(check_mrq_afroton)
    label_mrq_afroton.appendChild(texte_mrq_afroton)

    const label_mrq_andrea_varazzani = document.createElement('label')
    label_mrq_andrea_varazzani.className = "label_marque"
    const check_mrq_andrea_varazzani = document.createElement('input')
    check_mrq_andrea_varazzani.type = "checkbox"
    check_mrq_andrea_varazzani.className = "check_marque"
    check_mrq_andrea_varazzani.id = "marque_andrea_varazzani"
    const texte_mrq_andrea_varazzani = document.createElement('span')
    texte_mrq_andrea_varazzani.className = "texte_marque"
    texte_mrq_andrea_varazzani.textContent = " Andrea Varazzani"
    label_mrq_andrea_varazzani.appendChild(check_mrq_andrea_varazzani)
    label_mrq_andrea_varazzani.appendChild(texte_mrq_andrea_varazzani)

    const label_mrq_chewyz = document.createElement('label')
    label_mrq_chewyz.className = "label_marque"
    const check_mrq_chewyz = document.createElement('input')
    check_mrq_chewyz.type = "checkbox"
    check_mrq_chewyz.className = "check_marque"
    check_mrq_chewyz.id = "marque_chewyz"
    const texte_mrq_chewyz = document.createElement('span')
    texte_mrq_chewyz.className = "texte_marque"
    texte_mrq_chewyz.textContent = " CHEWYZ"
    label_mrq_chewyz.appendChild(check_mrq_chewyz)
    label_mrq_chewyz.appendChild(texte_mrq_chewyz)

    const label_mrq_coco_papaya = document.createElement('label')
    label_mrq_coco_papaya.className = "label_marque"
    const check_mrq_coco_papaya = document.createElement('input')
    check_mrq_coco_papaya.type = "checkbox"
    check_mrq_coco_papaya.className = "check_marque"
    check_mrq_coco_papaya.id = "marque_coco_papaya"
    const texte_mrq_coco_papaya = document.createElement('span')
    texte_mrq_coco_papaya.className = "texte_marque"
    texte_mrq_coco_papaya.textContent = " Coco Papaya"
    label_mrq_coco_papaya.appendChild(check_mrq_coco_papaya)
    label_mrq_coco_papaya.appendChild(texte_mrq_coco_papaya)

    const label_mrq_cort = document.createElement('label')
    label_mrq_cort.className = "label_marque"
    const check_mrq_cort = document.createElement('input')
    check_mrq_cort.type = "checkbox"
    check_mrq_cort.className = "check_marque"
    check_mrq_cort.id = "marque_cort"
    const texte_mrq_cort = document.createElement('span')
    texte_mrq_cort.className = "texte_marque"
    texte_mrq_cort.textContent = " Cort"
    label_mrq_cort.appendChild(check_mrq_cort)
    label_mrq_cort.appendChild(texte_mrq_cort)

    const label_mrq_djoliba = document.createElement('label')
    label_mrq_djoliba.className = "label_marque"
    const check_mrq_djoliba = document.createElement('input')
    check_mrq_djoliba.type = "checkbox"
    check_mrq_djoliba.className = "check_marque"
    check_mrq_djoliba.id = "marque_djoliba"
    const texte_mrq_djoliba = document.createElement('span')
    texte_mrq_djoliba.className = "texte_marque"
    texte_mrq_djoliba.textContent = " Djoliba"
    label_mrq_djoliba.appendChild(check_mrq_djoliba)
    label_mrq_djoliba.appendChild(texte_mrq_djoliba)

    const label_mrq_eko = document.createElement('label')
    label_mrq_eko.className = "label_marque"
    const check_mrq_eko = document.createElement('input')
    check_mrq_eko.type = "checkbox"
    check_mrq_eko.className = "check_marque"
    check_mrq_eko.id = "marque_eko"
    const texte_mrq_eko = document.createElement('span')
    texte_mrq_eko.className = "texte_marque"
    texte_mrq_eko.textContent = " Eko"
    label_mrq_eko.appendChild(check_mrq_eko)
    label_mrq_eko.appendChild(texte_mrq_eko)

    const label_mrq_fa_uebel = document.createElement('label')
    label_mrq_fa_uebel.className = "label_marque"
    const check_mrq_fa_uebel = document.createElement('input')
    check_mrq_fa_uebel.type = "checkbox"
    check_mrq_fa_uebel.className = "check_marque"
    check_mrq_fa_uebel.id = "marque_fa_uebel"
    const texte_mrq_fa_uebel = document.createElement('span')
    texte_mrq_fa_uebel.className = "texte_marque"
    texte_mrq_fa_uebel.textContent = " F.A. Uebel"
    label_mrq_fa_uebel.appendChild(check_mrq_fa_uebel)
    label_mrq_fa_uebel.appendChild(texte_mrq_fa_uebel)

    const label_mrq_fender = document.createElement('label')
    label_mrq_fender.className = "label_marque"
    const check_mrq_fender = document.createElement('input')
    check_mrq_fender.type = "checkbox"
    check_mrq_fender.className = "check_marque"
    check_mrq_fender.id = "marque_fender"
    const texte_mrq_fender = document.createElement('span')
    texte_mrq_fender.className = "texte_marque"
    texte_mrq_fender.textContent = " Fender"
    label_mrq_fender.appendChild(check_mrq_fender)
    label_mrq_fender.appendChild(texte_mrq_fender)

    const label_mrq_gear4music = document.createElement('label')
    label_mrq_gear4music.className = "label_marque"
    const check_mrq_gear4music = document.createElement('input')
    check_mrq_gear4music.type = "checkbox"
    check_mrq_gear4music.className = "check_marque"
    check_mrq_gear4music.id = "marque_gear4music"
    const texte_mrq_gear4music = document.createElement('span')
    texte_mrq_gear4music.className = "texte_marque"
    texte_mrq_gear4music.textContent = " Gear4music"
    label_mrq_gear4music.appendChild(check_mrq_gear4music)
    label_mrq_gear4music.appendChild(texte_mrq_gear4music)

    const label_mrq_gewa = document.createElement('label')
    label_mrq_gewa.className = "label_marque"
    const check_mrq_gewa = document.createElement('input')
    check_mrq_gewa.type = "checkbox"
    check_mrq_gewa.className = "check_marque"
    check_mrq_gewa.id = "marque_gewa"
    const texte_mrq_gewa = document.createElement('span')
    texte_mrq_gewa.className = "texte_marque"
    texte_mrq_gewa.textContent = " Gewa"
    label_mrq_gewa.appendChild(check_mrq_gewa)
    label_mrq_gewa.appendChild(texte_mrq_gewa)

    const label_mrq_gold_tone = document.createElement('label')
    label_mrq_gold_tone.className = "label_marque"
    const check_mrq_gold_tone = document.createElement('input')
    check_mrq_gold_tone.type = "checkbox"
    check_mrq_gold_tone.className = "check_marque"
    check_mrq_gold_tone.id = "marque_gold_tone"
    const texte_mrq_gold_tone = document.createElement('span')
    texte_mrq_gold_tone.className = "texte_marque"
    texte_mrq_gold_tone.textContent = " Gold Tone"
    label_mrq_gold_tone.appendChild(check_mrq_gold_tone)
    label_mrq_gold_tone.appendChild(texte_mrq_gold_tone)

    const label_mrq_harley_benton = document.createElement('label')
    label_mrq_harley_benton.className = "label_marque"
    const check_mrq_harley_benton = document.createElement('input')
    check_mrq_harley_benton.type = "checkbox"
    check_mrq_harley_benton.className = "check_marque"
    check_mrq_harley_benton.id = "marque_harley_benton"
    const texte_mrq_harley_benton = document.createElement('span')
    texte_mrq_harley_benton.className = "texte_marque"
    texte_mrq_harley_benton.textContent = " Harley Benton"
    label_mrq_harley_benton.appendChild(check_mrq_harley_benton)
    label_mrq_harley_benton.appendChild(texte_mrq_harley_benton)

    const label_mrq_ibanez = document.createElement('label')
    label_mrq_ibanez.className = "label_marque"
    const check_mrq_ibanez = document.createElement('input')
    check_mrq_ibanez.type = "checkbox"
    check_mrq_ibanez.className = "check_marque"
    check_mrq_ibanez.id = "marque_ibanez"
    const texte_mrq_ibanez = document.createElement('span')
    texte_mrq_ibanez.className = "texte_marque"
    texte_mrq_ibanez.textContent = " Ibanez"
    label_mrq_ibanez.appendChild(check_mrq_ibanez)
    label_mrq_ibanez.appendChild(texte_mrq_ibanez)

    const label_mrq_lag = document.createElement('label')
    label_mrq_lag.className = "label_marque"
    const check_mrq_lag = document.createElement('input')
    check_mrq_lag.type = "checkbox"
    check_mrq_lag.className = "check_marque"
    check_mrq_lag.id = "marque_lag"
    const texte_mrq_lag = document.createElement('span')
    texte_mrq_lag.className = "texte_marque"
    texte_mrq_lag.textContent = " Lag"
    label_mrq_lag.appendChild(check_mrq_lag)
    label_mrq_lag.appendChild(texte_mrq_lag)

    const label_mrq_lamine = document.createElement('label')
    label_mrq_lamine.className = "label_marque"
    const check_mrq_lamine = document.createElement('input')
    check_mrq_lamine.type = "checkbox"
    check_mrq_lamine.className = "check_marque"
    check_mrq_lamine.id = "marque_lamine"
    const texte_mrq_lamine = document.createElement('span')
    texte_mrq_lamine.className = "texte_marque"
    texte_mrq_lamine.textContent = " Lamine"
    label_mrq_lamine.appendChild(check_mrq_lamine)
    label_mrq_lamine.appendChild(texte_mrq_lamine)

    const label_mrq_langlie = document.createElement('label')
    label_mrq_langlie.className = "label_marque"
    const check_mrq_langlie = document.createElement('input')
    check_mrq_langlie.type = "checkbox"
    check_mrq_langlie.className = "check_marque"
    check_mrq_langlie.id = "marque_langlie"
    const texte_mrq_langlie = document.createElement('span')
    texte_mrq_langlie.className = "texte_marque"
    texte_mrq_langlie.textContent = " LANGLIE"
    label_mrq_langlie.appendChild(check_mrq_langlie)
    label_mrq_langlie.appendChild(texte_mrq_langlie)

    const label_mrq_master_bucur = document.createElement('label')
    label_mrq_master_bucur.className = "label_marque"
    const check_mrq_master_bucur = document.createElement('input')
    check_mrq_master_bucur.type = "checkbox"
    check_mrq_master_bucur.className = "check_marque"
    check_mrq_master_bucur.id = "marque_master_bucur"
    const texte_mrq_master_bucur = document.createElement('span')
    texte_mrq_master_bucur.className = "texte_marque"
    texte_mrq_master_bucur.textContent = " Master Bucur"
    label_mrq_master_bucur.appendChild(check_mrq_master_bucur)
    label_mrq_master_bucur.appendChild(texte_mrq_master_bucur)

    const label_mrq_meinl = document.createElement('label')
    label_mrq_meinl.className = "label_marque"
    const check_mrq_meinl = document.createElement('input')
    check_mrq_meinl.type = "checkbox"
    check_mrq_meinl.className = "check_marque"
    check_mrq_meinl.id = "marque_meinl"
    const texte_mrq_meinl = document.createElement('span')
    texte_mrq_meinl.className = "texte_marque"
    texte_mrq_meinl.textContent = " MEINL"
    label_mrq_meinl.appendChild(check_mrq_meinl)
    label_mrq_meinl.appendChild(texte_mrq_meinl)

    const label_mrq_muzikkon = document.createElement('label')
    label_mrq_muzikkon.className = "label_marque"
    const check_mrq_muzikkon = document.createElement('input')
    check_mrq_muzikkon.type = "checkbox"
    check_mrq_muzikkon.className = "check_marque"
    check_mrq_muzikkon.id = "marque_muzikkon"
    const texte_mrq_muzikkon = document.createElement('span')
    texte_mrq_muzikkon.className = "texte_marque"
    texte_mrq_muzikkon.textContent = " Muzikkon"
    label_mrq_muzikkon.appendChild(check_mrq_muzikkon)
    label_mrq_muzikkon.appendChild(texte_mrq_muzikkon)

    const label_mrq_ortega = document.createElement('label')
    label_mrq_ortega.className = "label_marque"
    const check_mrq_ortega = document.createElement('input')
    check_mrq_ortega.type = "checkbox"
    check_mrq_ortega.className = "check_marque"
    check_mrq_ortega.id = "marque_ortega"
    const texte_mrq_ortega = document.createElement('span')
    texte_mrq_ortega.className = "texte_marque"
    texte_mrq_ortega.textContent = " Ortega"
    label_mrq_ortega.appendChild(check_mrq_ortega)
    label_mrq_ortega.appendChild(texte_mrq_ortega)

    const label_mrq_rockabilly = document.createElement('label')
    label_mrq_rockabilly.className = "label_marque"
    const check_mrq_rockabilly = document.createElement('input')
    check_mrq_rockabilly.type = "checkbox"
    check_mrq_rockabilly.className = "check_marque"
    check_mrq_rockabilly.id = "marque_rockabilly"
    const texte_mrq_rockabilly = document.createElement('span')
    texte_mrq_rockabilly.className = "texte_marque"
    texte_mrq_rockabilly.textContent = " Rockabilly"
    label_mrq_rockabilly.appendChild(check_mrq_rockabilly)
    label_mrq_rockabilly.appendChild(texte_mrq_rockabilly)

    const label_mrq_selmer = document.createElement('label')
    label_mrq_selmer.className = "label_marque"
    const check_mrq_selmer = document.createElement('input')
    check_mrq_selmer.type = "checkbox"
    check_mrq_selmer.className = "check_marque"
    check_mrq_selmer.id = "marque_selmer"
    const texte_mrq_selmer = document.createElement('span')
    texte_mrq_selmer.className = "texte_marque"
    texte_mrq_selmer.textContent = " Selmer"
    label_mrq_selmer.appendChild(check_mrq_selmer)
    label_mrq_selmer.appendChild(texte_mrq_selmer)

    const label_mrq_shiver = document.createElement('label')
    label_mrq_shiver.className = "label_marque"
    const check_mrq_shiver = document.createElement('input')
    check_mrq_shiver.type = "checkbox"
    check_mrq_shiver.className = "check_marque"
    check_mrq_shiver.id = "marque_shiver"
    const texte_mrq_shiver = document.createElement('span')
    texte_mrq_shiver.className = "texte_marque"
    texte_mrq_shiver.textContent = " Shiver"
    label_mrq_shiver.appendChild(check_mrq_shiver)
    label_mrq_shiver.appendChild(texte_mrq_shiver)

    const label_mrq_stagg = document.createElement('label')
    label_mrq_stagg.className = "label_marque"
    const check_mrq_stagg = document.createElement('input')
    check_mrq_stagg.type = "checkbox"
    check_mrq_stagg.className = "check_marque"
    check_mrq_stagg.id = "marque_stagg"
    const texte_mrq_stagg = document.createElement('span')
    texte_mrq_stagg.className = "texte_marque"
    texte_mrq_stagg.textContent = " Stagg"
    label_mrq_stagg.appendChild(check_mrq_stagg)
    label_mrq_stagg.appendChild(texte_mrq_stagg)

    const label_mrq_takamine = document.createElement('label')
    label_mrq_takamine.className = "label_marque"
    const check_mrq_takamine = document.createElement('input')
    check_mrq_takamine.type = "checkbox"
    check_mrq_takamine.className = "check_marque"
    check_mrq_takamine.id = "marque_takamine"
    const texte_mrq_takamine = document.createElement('span')
    texte_mrq_takamine.className = "texte_marque"
    texte_mrq_takamine.textContent = " Takamine"
    label_mrq_takamine.appendChild(check_mrq_takamine)
    label_mrq_takamine.appendChild(texte_mrq_takamine)

    const label_mrq_taylor = document.createElement('label')
    label_mrq_taylor.className = "label_marque"
    const check_mrq_taylor = document.createElement('input')
    check_mrq_taylor.type = "checkbox"
    check_mrq_taylor.className = "check_marque"
    check_mrq_taylor.id = "marque_taylor"
    const texte_mrq_taylor = document.createElement('span')
    texte_mrq_taylor.className = "texte_marque"
    texte_mrq_taylor.textContent = " Taylor"
    label_mrq_taylor.appendChild(check_mrq_taylor)
    label_mrq_taylor.appendChild(texte_mrq_taylor)

    const label_mrq_thomann = document.createElement('label')
    label_mrq_thomann.className = "label_marque"
    const check_mrq_thomann = document.createElement('input')
    check_mrq_thomann.type = "checkbox"
    check_mrq_thomann.className = "check_marque"
    check_mrq_thomann.id = "marque_thomann"
    const texte_mrq_thomann = document.createElement('span')
    texte_mrq_thomann.className = "texte_marque"
    texte_mrq_thomann.textContent = " Thomann"
    label_mrq_thomann.appendChild(check_mrq_thomann)
    label_mrq_thomann.appendChild(texte_mrq_thomann)

    const label_mrq_uzman = document.createElement('label')
    label_mrq_uzman.className = "label_marque"
    const check_mrq_uzman = document.createElement('input')
    check_mrq_uzman.type = "checkbox"
    check_mrq_uzman.className = "check_marque"
    check_mrq_uzman.id = "marque_uzman"
    const texte_mrq_uzman = document.createElement('span')
    texte_mrq_uzman.className = "texte_marque"
    texte_mrq_uzman.textContent = " Uzman"
    label_mrq_uzman.appendChild(check_mrq_uzman)
    label_mrq_uzman.appendChild(texte_mrq_uzman)

    const label_mrq_yamaha = document.createElement('label')
    label_mrq_yamaha.className = "label_marque"
    const check_mrq_yamaha = document.createElement('input')
    check_mrq_yamaha.type = "checkbox"
    check_mrq_yamaha.className = "check_marque"
    check_mrq_yamaha.id = "marque_yamaha"
    const texte_mrq_yamaha = document.createElement('span')
    texte_mrq_yamaha.className = "texte_marque"
    texte_mrq_yamaha.textContent = " Yamaha"
    label_mrq_yamaha.appendChild(check_mrq_yamaha)
    label_mrq_yamaha.appendChild(texte_mrq_yamaha)

    const label_mrq_zmtv = document.createElement('label')
    label_mrq_zmtv.className = "label_marque"
    const check_mrq_zmtv = document.createElement('input')
    check_mrq_zmtv.type = "checkbox"
    check_mrq_zmtv.className = "check_marque"
    check_mrq_zmtv.id = "marque_zmtv"
    const texte_mrq_zmtv = document.createElement('span')
    texte_mrq_zmtv.className = "texte_marque"
    texte_mrq_zmtv.textContent = " ZMTV"
    label_mrq_zmtv.appendChild(check_mrq_zmtv)
    label_mrq_zmtv.appendChild(texte_mrq_zmtv)

    // ASSEMBLAGE DE LA SECTION MARQUE
    div_marque.appendChild(titre_marque)
    div_marque.appendChild(label_mrq_afroton)
    div_marque.appendChild(label_mrq_andrea_varazzani)
    div_marque.appendChild(label_mrq_chewyz)
    div_marque.appendChild(label_mrq_coco_papaya)
    div_marque.appendChild(label_mrq_cort)
    div_marque.appendChild(label_mrq_djoliba)
    div_marque.appendChild(label_mrq_eko)
    div_marque.appendChild(label_mrq_fa_uebel)
    div_marque.appendChild(label_mrq_fender)
    div_marque.appendChild(label_mrq_gear4music)
    div_marque.appendChild(label_mrq_gewa)
    div_marque.appendChild(label_mrq_gold_tone)
    div_marque.appendChild(label_mrq_harley_benton)
    div_marque.appendChild(label_mrq_ibanez)
    div_marque.appendChild(label_mrq_lag)
    div_marque.appendChild(label_mrq_lamine)
    div_marque.appendChild(label_mrq_langlie)
    div_marque.appendChild(label_mrq_master_bucur)
    div_marque.appendChild(label_mrq_meinl)
    div_marque.appendChild(label_mrq_muzikkon)
    div_marque.appendChild(label_mrq_ortega)
    div_marque.appendChild(label_mrq_rockabilly)
    div_marque.appendChild(label_mrq_selmer)
    div_marque.appendChild(label_mrq_shiver)
    div_marque.appendChild(label_mrq_stagg)
    div_marque.appendChild(label_mrq_takamine)
    div_marque.appendChild(label_mrq_taylor)
    div_marque.appendChild(label_mrq_thomann)
    div_marque.appendChild(label_mrq_uzman)
    div_marque.appendChild(label_mrq_yamaha)
    div_marque.appendChild(label_mrq_zmtv)

    // BOUTON SUBMIT
    const btn_submit = document.createElement('button')
    btn_submit.type = "submit"
    btn_submit.className = "btn_submit_filtre"
    btn_submit.textContent = "Appliquer"
    
    // EMBRICATION DES BLOCS ET RETOUR DU FORMULAIRE
    form_filtre.appendChild(div_famille)
    form_filtre.appendChild(div_instrument)
    form_filtre.appendChild(div_marque)
    form_filtre.appendChild(btn_submit)

    return form_filtre
}