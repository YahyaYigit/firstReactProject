import React from "react";
import Faq from "react-faq-component";
import "./FaqCom.css"; 

const data = {
    title: "Sıkça Sorulan Sorular", 
    rows: [
        {
            title: "Filmlere nasıl göz atabilirim?",
            content: `Filmleri ana sayfada kategoriye göre sıralayabilir ya da arama fonksiyonunu kullanarak istediğiniz filme ulaşabilirsiniz. Kategoriler arasında aksiyon, drama, komedi gibi seçenekler bulunmaktadır.`,
        },
        {
            title: "Filmleri nasıl eklerim?",
            content:
                "Yeni bir film eklemek için, hesabınıza giriş yaptıktan sonra 'Film Ekle' butonuna tıklayın. Film adı, açıklaması, kategorisi ve görseli gibi bilgileri girerek filme kolayca ekleme yapabilirsiniz.",
        },
        {
            title: "Bir film hakkında daha fazla bilgiye nasıl ulaşırım?",
            content: `Her bir filmin detay sayfasına giderek, o film hakkında daha fazla bilgiye ulaşabilirsiniz. Film açıklamaları, oyuncu kadrosu, yönetmen bilgisi ve kullanıcı yorumlarını burada bulabilirsiniz.`,
        },
        {
            title: "Film puanları nasıl hesaplanıyor?",
            content: `Film puanları, kullanıcıların verdiği oylar ile hesaplanmaktadır. Her kullanıcı film izledikten sonra, puanlama yapabilir ve bu puanlar toplamda filmin genel puanını oluşturur.`,
        },
        {
            title: "Hesap oluşturmak zorunlu mu?",
            content: <p>Hayır, hesap oluşturmak zorunlu değildir. Ancak, film izleme geçmişinizi kaydetmek ve favorilerinizi takip edebilmek için bir hesap oluşturmanızı öneririz.</p>,
        },
        {
            title: "Filmleri nasıl yorumlayabilirim?",
            content: `Filmlerin alt kısmında yer alan yorum alanına düşüncelerinizi yazabilirsiniz. Yorumlarınızı paylaşarak diğer kullanıcılar ile film hakkında sohbet edebilirsiniz.`,
        },
    ],
};

const styles = {
    rowTitleColor: "blue",
    rowTitleTextSize: "1.5rem",
    rowContentTextSize: "1.2rem",
};

const config = {
    animate: true,
    arrowIcon: "V",
    openOnload: 0,
    expandIcon: "+",
    collapseIcon: "-",
};

export default function FaqCom() {
    return (
        <div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
}
