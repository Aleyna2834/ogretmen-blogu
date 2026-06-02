/* =========================================================
    Öğretmenin Blogu 
   Sadece düz blog, arama/filtreleme ve detay sayfası
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    setupBlogFilter();
    setupDetailPage();
});

/* =============================
   Yardımcı Fonksiyonlar
============================= */

function normalizeText(value) {
    return (value || "")
        .toString()
        .toLocaleLowerCase("tr-TR")
        .replace(/ı/g, "i")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .trim();
}

/* =============================
   Blog Arama ve Filtreleme
============================= */

function setupBlogFilter() {
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const blogCards = document.querySelectorAll(".blog-card");
    const emptyMessage = document.getElementById("emptyMessage");

    if (!searchInput || blogCards.length === 0) {
        return;
    }

    let selectedCategory = "Tümü";

    function filterBlogs() {
        const searchText = normalizeText(searchInput.value);
        let visibleCount = 0;

        blogCards.forEach(function (card) {
            const title = normalizeText(card.querySelector("h3")?.textContent);
            const description = normalizeText(card.querySelector("p")?.textContent);
            const category = card.getAttribute("data-category") || "";

            const matchesSearch =
                title.includes(searchText) ||
                description.includes(searchText) ||
                normalizeText(category).includes(searchText);

            const matchesCategory =
                selectedCategory === "Tümü" || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (emptyMessage) {
            emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    searchInput.addEventListener("input", filterBlogs);

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            selectedCategory = button.getAttribute("data-category") || "Tümü";

            filterBlogs();
        });
    });
}

/* =============================
   Detay Sayfası Verileri
============================= */

const categoryData = {
    etkinlik: {
        title: "Etkinlik Fikirleri",
        badge: "Etkinlik",
        intro: "Okul öncesi öğretmenleri için sınıfta veya evde uygulanabilecek etkinlik önerileri.",
        items: [
            {
                title: "Renkli Duygu Maskeleri",
                image: "images/sanat.jpg",
                age: "4-6 Yaş",
                time: "30 Dakika",
                area: "Duygusal Gelişim ve Sanat",
                shortText: "Çocukların duyguları tanımasını ve ifade etmesini destekleyen yaratıcı maske etkinliği.",
                purpose: "Çocukların mutlu, üzgün, kızgın ve şaşkın gibi temel duyguları tanımasını sağlamak.",
                materials: [
                    "Karton tabak",
                    "Renkli boya",
                    "Makas",
                    "Yapıştırıcı",
                    "Dil çubuğu",
                    "İp veya lastik"
                ],
                preparation: "Öğretmen masaları hazırlar, duygu kartlarını gösterir ve çocuklarla kısa bir duygu sohbeti yapar.",
                steps: [
                    "Çocuklara farklı duygu ifadeleri gösterilir.",
                    "Her çocuk bir duygu seçer.",
                    "Karton tabak üzerine seçilen duygu yüzü çizilir.",
                    "Boya, karton ve artık materyallerle maske süslenir.",
                    "Çocuklar maskelerini takarak seçtikleri duyguyu anlatır."
                ],
                teacherNote: "Çocukların duyguları doğru veya yanlış diye değerlendirilmemelidir. Her duygu doğal kabul edilmelidir."
            },
            {
                title: "Doğa Kolajı",
                image: "images/sanat.jpg",
                age: "4-6 Yaş",
                time: "35 Dakika",
                area: "Sanat ve Doğa Farkındalığı",
                shortText: "Yaprak, dal ve doğal materyallerle hazırlanan yaratıcı kolaj çalışması.",
                purpose: "Çocukların doğayı gözlemlemesini ve farklı dokuları tanımasını sağlamak.",
                materials: [
                    "Yapraklar",
                    "Küçük dallar",
                    "Pamuk",
                    "Karton",
                    "Yapıştırıcı",
                    "Pastel boya"
                ],
                preparation: "Etkinlik öncesi çocuklarla bahçeden güvenli doğal materyaller toplanır.",
                steps: [
                    "Toplanan materyaller çocuklarla incelenir.",
                    "Renk, şekil ve doku hakkında konuşulur.",
                    "Çocuklar karton üzerine kendi doğa resimlerini oluşturur.",
                    "Malzemeler yapıştırılır ve boya ile tamamlanır.",
                    "Çalışmalar sınıfta sergilenir."
                ],
                teacherNote: "Doğadan materyal toplarken canlı bitkilere zarar vermemeye dikkat edilmelidir."
            },
            {
                title: "Hikaye Sonrası Resimleme",
                image: "images/hikaye.jpg",
                age: "5-6 Yaş",
                time: "25 Dakika",
                area: "Dil ve Yaratıcılık",
                shortText: "Okunan hikayenin çocuklar tarafından resimle anlatıldığı etkinlik.",
                purpose: "Çocukların dinlediklerini anlamasını, hatırlamasını ve görsel olarak ifade etmesini desteklemek.",
                materials: [
                    "Resim kağıdı",
                    "Kuru boya",
                    "Pastel boya",
                    "Hikaye kitabı"
                ],
                preparation: "Kısa ve görsel açıdan zengin bir hikaye seçilir. Çocuklar rahatça dinleyebilecekleri şekilde oturtulur.",
                steps: [
                    "Hikaye etkili ses tonu ile okunur.",
                    "Çocuklara hikayede en çok neyi sevdikleri sorulur.",
                    "Çocuklar sevdikleri bölümü resimler.",
                    "Resimler tamamlandıktan sonra çocuklar çalışmalarını anlatır."
                ],
                teacherNote: "Çocuğun resmi hikayeyle birebir aynı olmak zorunda değildir. Hayal gücünü kullanmasına izin verilmelidir."
            }
        ]
    },

    oyun: {
        title: "Oyun Fikirleri",
        badge: "Oyun",
        intro: "Çocukların oyun yoluyla öğrenmesini destekleyen eğlenceli sınıf içi oyunlar.",
        items: [
            {
                title: "Renk Avı Oyunu",
                image: "images/oyun.jpg",
                age: "3-6 Yaş",
                time: "20 Dakika",
                area: "Bilişsel Gelişim",
                shortText: "Çocukların renkleri tanıması ve çevresindeki nesneleri fark etmesi için eğlenceli oyun.",
                purpose: "Renkleri ayırt etme, dikkat ve gözlem becerisini geliştirmek.",
                materials: [
                    "Renk kartları",
                    "Sınıftaki güvenli nesneler",
                    "Sepet"
                ],
                preparation: "Öğretmen sınıfta farklı renklerde güvenli nesneleri belirler ve renk kartlarını hazırlar.",
                steps: [
                    "Öğretmen bir renk kartı gösterir.",
                    "Çocuklardan sınıfta aynı renkte bir nesne bulmaları istenir.",
                    "Bulunan nesneler sepete konur veya gösterilir.",
                    "Her çocuk bulduğu nesnenin adını ve rengini söyler.",
                    "Oyun farklı renklerle devam eder."
                ],
                teacherNote: "Koşma ve çarpışmaları önlemek için çocuklara yavaş hareket etmeleri hatırlatılmalıdır."
            },
            {
                title: "Hafıza Kartları Oyunu",
                image: "images/oyun.jpg",
                age: "4-6 Yaş",
                time: "25 Dakika",
                area: "Dikkat ve Hafıza",
                shortText: "Eş kartları bulmaya dayalı dikkat ve hafıza oyunu.",
                purpose: "Çocukların görsel hafıza, dikkat ve eşleştirme becerilerini geliştirmek.",
                materials: [
                    "Eşleştirme kartları",
                    "Masa veya halı alanı"
                ],
                preparation: "Kartlar karıştırılır ve görseller aşağı bakacak şekilde düz bir zemine dizilir.",
                steps: [
                    "Çocuklar sırayla iki kart açar.",
                    "Kartlar aynıysa çocuk kartları alır.",
                    "Kartlar farklıysa tekrar kapatılır.",
                    "Oyun tüm eşler bulunana kadar devam eder.",
                    "Oyun sonunda bulunan eşler birlikte sayılır."
                ],
                teacherNote: "Rekabet yerine sıra bekleme ve dikkat becerisi vurgulanmalıdır."
            },
            {
                title: "Sessiz Sinema Oyunu",
                image: "images/oyun.jpg",
                age: "5-6 Yaş",
                time: "20 Dakika",
                area: "Sosyal ve Dil Gelişimi",
                shortText: "Çocukların beden diliyle anlatım yapmasını sağlayan eğlenceli oyun.",
                purpose: "Çocukların kendini ifade etme, gözlem ve tahmin etme becerilerini geliştirmek.",
                materials: [
                    "Hayvan veya meslek kartları",
                    "Boş oyun alanı"
                ],
                preparation: "Öğretmen çocukların bildiği hayvan, meslek veya günlük hareket kartları hazırlar.",
                steps: [
                    "Bir çocuk kart seçer.",
                    "Karttaki varlığı konuşmadan hareketlerle anlatır.",
                    "Diğer çocuklar tahmin eder.",
                    "Doğru tahminden sonra başka çocuk seçilir.",
                    "Oyun herkes katılana kadar sürer."
                ],
                teacherNote: "Utanan çocuklar zorlanmamalı, isterlerse öğretmenle birlikte canlandırma yapmalıdır."
            }
        ]
    },

    gelisim: {
        title: "Gelişim Destekleyici Fikirler",
        badge: "Gelişim",
        intro: "Çocukların dil, motor, sosyal ve duygusal gelişimini destekleyen çalışmalar.",
        items: [
            {
                title: "Dil Gelişimi İçin Hikaye Tamamlama",
                image: "images/dil.jpg",
                age: "4-6 Yaş",
                time: "25 Dakika",
                area: "Dil Gelişimi",
                shortText: "Çocukların cümle kurma ve hayal gücünü destekleyen hikaye tamamlama çalışması.",
                purpose: "Çocukların kelime dağarcığını, ifade becerisini ve dinleme alışkanlığını geliştirmek.",
                materials: [
                    "Kısa hikaye",
                    "Resimli kartlar",
                    "Kukla"
                ],
                preparation: "Öğretmen yarım bırakılabilecek kısa bir hikaye hazırlar.",
                steps: [
                    "Hikaye çocuklara okunur.",
                    "Hikaye önemli bir yerde durdurulur.",
                    "Çocuklardan hikayenin nasıl devam edebileceği sorulur.",
                    "Farklı cevaplar dinlenir.",
                    "Çocukların fikirleriyle hikaye tamamlanır."
                ],
                teacherNote: "Her çocuğun cevabı değerlidir. Yanlış cevap vurgusu yapılmamalıdır."
            },
            {
                title: "İnce Motor İçin Boncuk Dizme",
                image: "images/sanat.jpg",
                age: "4-6 Yaş",
                time: "20 Dakika",
                area: "Motor Gelişim",
                shortText: "El-göz koordinasyonunu destekleyen basit boncuk dizme çalışması.",
                purpose: "Çocukların parmak kaslarını, dikkatini ve el-göz koordinasyonunu geliştirmek.",
                materials: [
                    "Büyük boncuklar",
                    "Kalın ip",
                    "Renk kartları"
                ],
                preparation: "Küçük parçalar için güvenlik kontrolü yapılır. Yaşa uygun büyük boncuklar seçilir.",
                steps: [
                    "Çocuklara boncuklar ve renkler tanıtılır.",
                    "Örnek bir dizilim gösterilir.",
                    "Çocuklardan kendi bilekliklerini yapmaları istenir.",
                    "İsteyen çocuk renk örüntüsü oluşturur.",
                    "Çalışmalar tamamlanınca çocuklar ürünlerini tanıtır."
                ],
                teacherNote: "Küçük yaş gruplarında boncuk boyutları büyük seçilmeli ve etkinlik mutlaka gözetim altında yapılmalıdır."
            }
        ]
    },

    aile: {
        title: "Aile Katılımı Fikirleri",
        badge: "Aile",
        intro: "Ailelerin okul öncesi eğitim sürecine katılımını destekleyen öneriler.",
        items: [
            {
                title: "Evde 10 Dakikalık Kitap Saati",
                image: "images/aile.jpg",
                age: "3-6 Yaş",
                time: "10-15 Dakika",
                area: "Dil ve Aile Katılımı",
                shortText: "Ailelerin evde kolayca uygulayabileceği kısa kitap okuma rutini.",
                purpose: "Çocuklara kitap sevgisi kazandırmak ve aile-çocuk iletişimini güçlendirmek.",
                materials: [
                    "Resimli çocuk kitabı",
                    "Rahat okuma köşesi"
                ],
                preparation: "Aileye yaşa uygun kısa kitap önerileri sunulur.",
                steps: [
                    "Aile ve çocuk sessiz bir alana geçer.",
                    "Kitabın kapağı incelenir.",
                    "Çocuğa kitabın ne hakkında olabileceği sorulur.",
                    "Kitap birlikte okunur.",
                    "Sonunda çocuğa en sevdiği bölüm sorulur."
                ],
                teacherNote: "Ailelere uzun süreli etkinlikler yerine kısa ve sürdürülebilir rutinler önerilmelidir."
            },
            {
                title: "Aile Katılımlı Sanat Günü",
                image: "images/aile.jpg",
                age: "4-6 Yaş",
                time: "40 Dakika",
                area: "Sanat ve Sosyal Gelişim",
                shortText: "Aile ve çocuğun birlikte ürün ortaya koyduğu okul-aile iş birliği etkinliği.",
                purpose: "Ailelerin eğitim sürecine katılımını artırmak ve çocukla kaliteli zaman geçirmelerini sağlamak.",
                materials: [
                    "Karton",
                    "Boya",
                    "Makas",
                    "Yapıştırıcı",
                    "Artık materyaller"
                ],
                preparation: "Ailelere önceden bilgilendirme yapılır. Etkinlik konusu ve gerekli malzemeler paylaşılır.",
                steps: [
                    "Öğretmen etkinliğin amacını açıklar.",
                    "Aile ve çocuk birlikte tasarım yapar.",
                    "Malzemelerle ortak çalışma tamamlanır.",
                    "Her aile çalışmasını kısa şekilde tanıtır.",
                    "Çalışmalar sınıfta sergilenir."
                ],
                teacherNote: "Ailenin çocuğun yerine yapmasına izin verilmemeli, çocuk aktif katılımcı olmalıdır."
            }
        ]
    },

    sinif: {
        title: "Sınıf İçi Uygulamalar",
        badge: "Sınıf İçi",
        intro: "Okul öncesi sınıflarında düzeni, güveni ve katılımı artıran uygulamalar.",
        items: [
            {
                title: "Günlük Rutin Panosu",
                image: "images/sinif.jpg",
                age: "3-6 Yaş",
                time: "Günlük",
                area: "Sınıf Yönetimi",
                shortText: "Çocukların gün akışını takip etmesini sağlayan görsel rutin panosu.",
                purpose: "Çocukların kendilerini güvende hissetmesini ve sınıf düzenine uyum sağlamasını desteklemek.",
                materials: [
                    "Pano",
                    "Resimli rutin kartları",
                    "Cırt cırt",
                    "Kalem"
                ],
                preparation: "Karşılama, oyun, etkinlik, yemek, dinlenme ve kapanış için görsel kartlar hazırlanır.",
                steps: [
                    "Günün başında rutin panosu çocuklarla incelenir.",
                    "Her geçiş öncesi sıradaki etkinlik gösterilir.",
                    "Tamamlanan etkinlik işaretlenir.",
                    "Günün sonunda çocuklarla kısa değerlendirme yapılır."
                ],
                teacherNote: "Görsel rutinler özellikle okula yeni başlayan çocuklarda kaygıyı azaltır."
            },
            {
                title: "Sabah Çemberi",
                image: "images/sinif.jpg",
                age: "3-6 Yaş",
                time: "15 Dakika",
                area: "Sosyal ve Dil Gelişimi",
                shortText: "Güne düzenli ve sıcak bir başlangıç yapmayı sağlayan sınıf rutini.",
                purpose: "Çocukların güne uyum sağlamasını, kendini ifade etmesini ve arkadaşlarını dinlemesini desteklemek.",
                materials: [
                    "Yumuşak top",
                    "Takvim kartları",
                    "Hava durumu kartları"
                ],
                preparation: "Çocuklar çember şeklinde oturur. Takvim ve hava durumu kartları hazırlanır.",
                steps: [
                    "Öğretmen çocukları selamlar.",
                    "Günün tarihi ve hava durumu konuşulur.",
                    "Top sırayla çocuklara verilir.",
                    "Topu alan çocuk nasıl hissettiğini söyler.",
                    "Günün kısa planı paylaşılır."
                ],
                teacherNote: "Her çocuk konuşmak zorunda bırakılmamalıdır. Zamanla katılımı artacaktır."
            }
        ]
    }
};

/* =============================
   Detay Sayfası
============================= */

function setupDetailPage() {
    const categoryTitle = document.getElementById("categoryTitle");

    if (!categoryTitle) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const categoryKey = params.get("kategori") || "etkinlik";
    const category = categoryData[categoryKey] || categoryData.etkinlik;
    const allItems = category.items;

    document.getElementById("detailCategoryBadge").textContent = category.badge;
    document.getElementById("categoryTitle").textContent = category.title;
    document.getElementById("categoryIntro").textContent = category.intro;

    const activityList = document.getElementById("activityList");
    activityList.innerHTML = "";

    allItems.forEach(function (item, index) {
        const button = document.createElement("button");
        button.textContent = item.title;

        if (index === 0) {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {
            const buttons = activityList.querySelectorAll("button");

            buttons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            showActivityDetail(item);
        });

        activityList.appendChild(button);
    });

    if (allItems.length > 0) {
        showActivityDetail(allItems[0]);
    }
}

function showActivityDetail(item) {
    const imageElement = document.getElementById("activityImage");

    if (imageElement) {
        imageElement.src = item.image;
        imageElement.alt = item.title;
    }

    document.getElementById("activityCategory").textContent = item.area;
    document.getElementById("activityTitle").textContent = item.title;
    document.getElementById("activityShortText").textContent = item.shortText;
    document.getElementById("activityAge").textContent = item.age;
    document.getElementById("activityTime").textContent = item.time;
    document.getElementById("activityArea").textContent = item.area;
    document.getElementById("activityPurpose").textContent = item.purpose;
    document.getElementById("activityPreparation").textContent = item.preparation;
    document.getElementById("activityTeacherNote").textContent = item.teacherNote;

    const materialsList = document.getElementById("activityMaterials");
    materialsList.innerHTML = "";

    item.materials.forEach(function (material) {
        const li = document.createElement("li");
        li.textContent = material;
        materialsList.appendChild(li);
    });

    const stepsList = document.getElementById("activitySteps");
    stepsList.innerHTML = "";

    item.steps.forEach(function (step) {
        const li = document.createElement("li");
        li.textContent = step;
        stepsList.appendChild(li);
    });
}