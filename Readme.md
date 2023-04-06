Bus Ticket Booking API
Bu proje, bir otobüs bileti rezervasyon sistemi için bir API sağlar. API, otobüs seferleri, koltuklar ve kullanıcılar için CRUD işlemleri sağlar.

Kurulum
Bu projeyi klonlayın
Terminali açın ve projenin ana dizininde npm install komutunu çalıştırın
.env.example dosyasının adını .env olarak değiştirin ve ilgili alanları doldurun
Terminali açın ve projenin ana dizininde npm start komutunu çalıştırın
API Dokümantasyonu
API'yi kullanmak için aşağıdaki kaynakları kullanın.

Otobüs Seferleri
Kaynak	Yöntem	Açıklama
/trips	GET	Tüm seferleri listeler
/trips/:id	GET	Belirli bir seferi getirir


Örnek bir sefer JSON nesnesi:

{
  "departureCity": "Istanbul",
  "arrivalCity": "Ankara",
  "departureTime": "2022-02-02T12:30:00.000Z",
  "arrivalTime": "2022-02-02T15:30:00.000Z",
  "price": 50
}
Koltuklar
Kaynak	Yöntem	Açıklama
/seats	GET	Tüm koltukları listeler


Örnek bir koltuk JSON nesnesi:

{
  "trip": "615d861690f6c3323a742a25",
  "number": 5,
  "isOccupied": false,
  "gender": null,
  "passenger": null
}
Kullanıcılar
Kaynak	Yöntem	Açıklama
/users/:id	UPDATE	Belirli bir kullanıcı bilgisini günceller
/users/:id	DELETE	Belirli bir kullanıcıyı siler

TicketBuy 
Kaynak	Yöntem	Açıklama
/tickets/:userId  GET Kullanıcı is'sine göre biletleri listeler
/tickets/:ticketId GET Ticket İd'sine göre ticket detail gösterir

