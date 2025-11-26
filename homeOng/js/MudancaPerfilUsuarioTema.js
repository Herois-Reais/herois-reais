import { btnExcluirPerfilOng, btnMenuHamburguer, iconeMenuHam, iconeMenuX, perfilOngContainer, sectionMenuHamX } from "./elementosHTML.js"

const pontoDeParadaDoEstiloJS = window.matchMedia('(min-width: 851px)');

function tirarEstiloMobile(){
    if (pontoDeParadaDoEstiloJS.matches){
        perfilOngContainer.style.removeProperty('display')
        perfilOngContainer.style.removeProperty('z-index')
        perfilOngContainer.style.removeProperty('position')
        perfilOngContainer.style.removeProperty('top')
        perfilOngContainer.style.removeProperty('padding-top')
        perfilOngContainer.style.removeProperty('left')


        btnMenuHamburguer.style.removeProperty('margin-left')
        btnMenuHamburguer.style.removeProperty('margin-top')
        btnMenuHamburguer.style.removeProperty('border')
        btnMenuHamburguer.style.removeProperty('background-color')
        btnMenuHamburguer.style.removeProperty('box-shadow')
        btnMenuHamburguer.style.removeProperty('-webkit-box-shadow')
        btnMenuHamburguer.style.removeProperty('moz-box-shadow')

        sectionMenuHamX.style.removeProperty('display')
        sectionMenuHamX.style.removeProperty('z-index')
        sectionMenuHamX.style.removeProperty('position')
        sectionMenuHamX.style.removeProperty('width')
        sectionMenuHamX.style.removeProperty('background-color')
        sectionMenuHamX.style.removeProperty('margin-top')
        sectionMenuHamX.style.removeProperty('align-self')
        sectionMenuHamX.style.removeProperty('border')

        if(iconeMenuX && iconeMenuHam){
            iconeMenuX.style.removeProperty('display')
            iconeMenuHam.style.removeProperty('display')
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){

    pontoDeParadaDoEstiloJS.addListener(tirarEstiloMobile)

    tirarEstiloMobile()

    if(btnMenuHamburguer && perfilOngContainer){
        btnMenuHamburguer.addEventListener('click', function(){
            console.log('clicou');

            const estiloCompleto = window.getComputedStyle(perfilOngContainer)
            
            const esconderPerfilUsuario = estiloCompleto.display === 'none'

            if(esconderPerfilUsuario){
                perfilOngContainer.style.display = 'flex'
                perfilOngContainer.style.zIndex = 999
                perfilOngContainer.style.position = 'absolute'
                perfilOngContainer.style.top = 0
                perfilOngContainer.style.paddingTop = '50px'
                perfilOngContainer.style.lef = 0
                
                iconeMenuHam.style.display = 'none'
                
                iconeMenuX.style.display = 'flex'

                btnMenuHamburguer.style.marginLeft = '30px'
                btnMenuHamburguer.style.marginTop = '20px'
                btnMenuHamburguer.style.backgroundColor = '#BE5A2A'

                if (btnMenuHamburguer){
                    btnMenuHamburguer.addEventListener('mouseover', function(){
                        btnMenuHamburguer.style.border = '0.5px solid #fff'
                        btnMenuHamburguer.style.boxShadow = '0px 0px 3px 1px #fff'
                        btnMenuHamburguer.style.webkitBoxShadow = '0px 0px 3px 1px #fff'
                        btnMenuHamburguer.style.mozBoxShadow = '0px 0px 3px 1px #fff'
                    })

                    btnMenuHamburguer.addEventListener('mouseout', function(){
                        btnMenuHamburguer.style.border = 'none'
                        btnMenuHamburguer.style.boxShadow = 'none'
                        btnMenuHamburguer.style.webkitBoxShadow = 'none'
                        btnMenuHamburguer.style.mozBoxShadow = 'none'
                    })
                }

                sectionMenuHamX.style.zIndex = 1001
                sectionMenuHamX.style.position = 'abloute'
                sectionMenuHamX.style.width = '280px'
                sectionMenuHamX.style.backgroundColor = '#2E662E'
                sectionMenuHamX.style.marginTop = 0
                sectionMenuHamX.style.alignSelf = 'flex-start'
                sectionMenuHamX.style.border = '1px solid #2E662E'
                perfilOngContainer.style.top = 0
                perfilOngContainer.style.lef = 0
            } 
            
            else {
                perfilOngContainer.style.zIndex = 'initial'
                perfilOngContainer.style.display = 'none'
                perfilOngContainer.style.position = 'relative'

                iconeMenuX.style.display = 'none'

                iconeMenuHam.style.display = 'flex'

                btnMenuHamburguer.style.marginLeft = 0
                btnMenuHamburguer.style.marginTop = 0
                btnMenuHamburguer.style.alignSelf = 'center'
                btnMenuHamburguer.style.backgroundColor = '#2E662E'

                if (btnMenuHamburguer){
                    btnMenuHamburguer.addEventListener('mouseover', function(){
                        btnMenuHamburguer.style.border = '0.5px solid #000'
                        btnMenuHamburguer.style.boxShadow = '0px 0px 3px 1px #000'
                        btnMenuHamburguer.style.webkitBoxShadow = '0px 0px 3px 1px #000'
                        btnMenuHamburguer.style.mozBoxShadow = '0px 0px 3px 1px #000'
                    })

                    btnMenuHamburguer.addEventListener('mouseout', function(){
                        btnMenuHamburguer.style.border = 'none'
                        btnMenuHamburguer.style.boxShadow = 'none'
                        btnMenuHamburguer.style.webkitBoxShadow = 'none'
                        btnMenuHamburguer.style.mozBoxShadow = 'none'
                    })
                }
                
                sectionMenuHamX.classList.add('classeTeste')
            }
        })
    }
})