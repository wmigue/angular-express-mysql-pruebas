import { Component, OnInit } from '@angular/core';
import { ContentElement, Noticia } from 'src/app/models/noticia';
import confetti from "canvas-confetti";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})

export class NoticiasComponent implements OnInit {

  ngOnInit() {
  }

  public URL_BASE: string = "https://infobae.com";
  public IMG_PLACEHOLDER: string ="";
  public loading: boolean = true;
  public error: boolean = false;
  public noticias: ContentElement[];
  public noticiasFiltradas: ContentElement[];
  public cantidadMostrada: number = 10;
  public buscarTexto: string = "";

  constructor() {
    this.actualizar();
  }

  validarCantidad(ev: Event) {
    this.cantidadMostrada =
      this.cantidadMostrada <= 0
        ? 1
        : this.cantidadMostrada > 100
          ? 100
          : this.cantidadMostrada;

    this.actualizar();
  }

  trackNoticias(index, item: ContentElement) {
    return item.last_updated_date;
  }

  getTitular(noticia: ContentElement, i: number) {
    const pildora =
      "<span class='badge badge-pill badge-primary'>" + (i + 1) + "</span> ";
    return pildora + noticia.headlines.basic.replace(":", ":<br/>");
  }

  //https://via.placeholder.com/300x300?text=@SebaM90
  cargarImagen(noticia: ContentElement) {
    noticia.promo_items.basic.url_placeholder = "";
  }

  filtrar() {
    this.noticiasFiltradas = this.noticias.filter(
      n =>
        n.headlines.basic
          .toLowerCase()
          .includes(this.buscarTexto.toLowerCase()) ||
        n.description.basic
          .toLowerCase()
          .includes(this.buscarTexto.toLowerCase())
    );
  }

  actualizar() {
    this.loading = true;
    this.error = false;

    fetch(
      `https://www.infobae.com/pf/api/v3/content/fetch/feed-list?query={"feedLimit":${this.cantidadMostrada
      },"feedOffset":0,"feedOrder":"display_date:desc","feedParam":"true","feedType":"taxonomy.sites.path:(\\"/politica\\" \\"/sociedad\\" \\"/economia\\" \\"/deportes-2\\" \\"/tecno\\" \\"/tendencias\\" \\"/salud\\" \\"/autos\\" \\"/turismo\\" \\"/cultura\\" \\"/grandes-libros\\" \\"/fotos\\" \\"/discapacidad\\" \\"/teleshow\\" \\"/america/america-latina\\" \\"/america/mundo\\" NOT \\"/deportes-2/diarios-deportivos\\" AND NOT \\"/gente/espacio-no-editorial-revista-gente\\" AND NOT \\"/gente/ediciones\\" AND NOT \\"/parati/ediciones-archivo\\" AND NOT \\"/parati/espacio-no-editorial-parati/\\") AND revision.published"}`,
      {
        method: "GET",
        redirect: "follow"
      }
    )
      .then(response => {
        console.log(response.clone());
        return response.json();
      })
      .then((r: Noticia) => {
        console.log(r);
/*         confetti({
          particleCount: 60,
          spread: 100,
          origin: { x: 0.39, y: 0.9 }
        }); */
        this.noticias = r.content_elements.map(x => {
          x.promo_items.basic.url_placeholder = this.IMG_PLACEHOLDER; // agrego la imagen de placeholder
          return x;
        });
        this.filtrar();
      })
      .catch(error => {
        this.noticias = [];
        this.error = true;
        console.log("error", error);
      })
      .then(() => (this.loading = false));
  }




}

