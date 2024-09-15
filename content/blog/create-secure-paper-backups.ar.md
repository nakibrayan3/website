---
draft: false
title: كيف تحفظ سر في الورق بطريقة أمنة
date: 2024-02-09
lastmod: 2024-07-27
tags:
  - نُسخ_احتياطية
  - تعمية
description: في هذا المقال أشرح طريقة لتخزين سر في الورق بطريقة أمنة، حيث لايمكن لأي شخص معرفة السر بمجرد قرائتهم للورقة. وذلك بإستعمال خوارزمية شامير لمشاركة الأسرار لتقسيم السر إلى عدة أجزاء ثم تعمية كل جزء بخوارزمية التجزئة الآمنة-2.
---
للإنتقال إلى الدليل مباشرتًا اضغط هنا: [إنتقل إلى الدليل](#المتطلبات).

## مقدمة

لدى الجميع معلومات سرية، منها البيانات اللازمة للولوج إلى حسابات في الإنترنت والعبارة
السرية لمُدير كلمات السر وأرقام الحسابات المصرفية ومعلومات الضرائب والتأمين والضمان
الاجتماعي والرمز التذكُري (mnemonic) لمحفظة بيتكوين وأي بيانات أخرى حيوية في العالم
الرقمي وكذلك في العالم الحقيقي.

ولا يمكننا تحمل خصارة فقدان تلك المعلومات السرية، لذلك علينا نسخها احتياطيًا. قد يلجئ
البعض إلى كتابة هذه الأسرار في حاسوبه الشخصي، لكن هذا خطير جدًا؛ ففي حالة اختُرق
الحاسوب سيحصل المخترقين على السر وهذا أمر سيئ، وقد يلجئ البعض الأخر إلى كتابة السر على ورقة،
 هذه الأخيرة أكثر أمانًا من تخزين السر في حاسوب متصل بالشبكة، لكنها ليست بلا عيوب؛ فأي
 شخص كان سارق أو متطفل يستطيع قرائة السر مباشرة من الورقة.

في هذا المقال أشرح طريقة لتخزين سر في الورق بطريقة أمنة، حيث لايمكن لأي شخص معرفة السر
بمجرد قرائتهم للورقة. وذلك بإستعمال
[خوارزمية شامير لمشاركة الأسرار](https://wikipedia.org/wiki/Shamir%27s_secret_sharing)
لتقسيم السر إلى عدة أجزاء ثم [تعمية](https://ar.wikipedia.org/wiki/%D8%AA%D8%B9%D9%85%D9%8A%D8%A9_(%D8%AA%D8%AE%D8%B5%D8%B5)) كل جزء
[بخوارزمية التجزئة الآمنة-2](https://ar.wikipedia.org/wiki/%D8%AE%D9%88%D8%A7%D8%B1%D8%B2%D9%85%D9%8A%D8%A9_%D8%A7%D9%84%D8%AA%D8%AC%D8%B2%D8%A6%D8%A9_%D8%A7%D9%84%D8%A2%D9%85%D9%86%D8%A9-2).

## شرح خاورزمية شامير لمشاركة الأسرار

خاورزمية شامير لمشاركة الأسرار طريقة فعّالة لمشاركة سر بين مجموعة. بحيث لا يمكن الكشف عن السر ما لم يعمل نصاب من المجموعة معًا لتجميع معارفهم والكشف عن السر .لتحقيق ذلك، يُقسَّم السر حسب معادلات رياضية إلى
عدة **أجزاء**، التي لا يمكن إعادة تجميع السر منها إلاّ عند دمج عدد كاف من الأجزاء، **ويسمى العدد
اﻻزم من الأجزاء لجمع السر بالعتبة**، تتمتع هذه الخاورمية بخاصية
[الأمان من حيث نظرية المعلومات](https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%A3%D9%85%D8%A7%D9%86_%D9%85%D9%86_%D8%AD%D9%8A%D8%AB_%D9%86%D8%B8%D8%B1%D9%8A%D8%A9_%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA)،
معناه حتى إذا إستولى مهاجم على بعض من الأجزاء من المستحيل له إعادة بناء السر ما لم يكن قد
إستولى على عدد يساوي أو يفوق العتبة.

مثلاّ: تحتاج شركة إلى تأمين خزينتها، إذا كان شخص واحد يعرف رمز المخزن، فقد يفقده أو ينساه،
وإذا كان هناك العديد من الأشخاص الذين يعرفون نفس الرمز، فقد لا يثقون في بعضهم البعض
للتصرف دائما بأمانة.

في هذه الحالة يمكن للشركة أن تستخدم خوارزمية شامير لمشاركة الأسرار لإنشاء أجزاء من رمز الخزنة ثم
توزيعها على الأفراد المصرح لهم في الشركة، يمكن تحديد العتبة (الحد الأدنى من الأجزاء اللازمة
لتجميع السر)، بحيث لا يمكن فتح المخزن إلاّ عند جمع عدد يساوي
أو يفوق العتبة، وﻻيمكن معرفة رمز الخزنة بإستخدام عدد أقل من العتبة.

عن طريق الخطأ أو كعمل معارض، قد يقدم بعض الأفراد أجزاء غير صحيحة من الرمز، إذا فشلت في
جمع عدد كافِ من الأجزاء الصحيحة فسيظل المخزن مغلقا.

## مثال لإستخدام عملي لطرق هذا المقال

الطرق المشروحة في هذا المقال ممتازة لنقل سر إلى الورثة بعد موت صاحبه من دون إعطاء السر
إلى طرف ثالث.

مثلاّ: شخص يملك محفظة بيتكوين، يمكنه تقسيم الرمز التذكُري (mnemonic) للمحفظة إلى 3
أجزاء وإعطاء واحد للورثة وأخر للبنك وأخر يبقيه عنده، وفي حالة موته يحتاج الورثة إلى جزئين
أو أكثر لإعادة تجميع السر، لديهم واحد بالفعل ويمكنهم طلب أخر من البنك أو البحث عن النسخة
التي أبقاه عنده.

## المتطلبات

- حاسوب مع نظام التشغيل [تايلز](https://tails.net).
- خبرة في إستخدام الطرفيّة.

## أنشئ النسخة الاحتياطية

### الخطوة 1: أضِف كلمة سرّ إدارية لنظام التشغيل تايلز

بعد إقلاع نظام التشغيل تايلز، في نافذة `مرحبا بك إلى تايلز !` في قسم `Addiional Settings`،
إضغط على زر `+`.

<!-- ![لقطة شاشة لنافذة مرحبا بك إلى تايلز !](لقطة_شاشة_لنافذة_مرحبا_بك_إلى_تايلز_!.jpg) -->

ثم اضغط على زر `Administraion Password` وأضِف كلمة سرّ إدارية، ثم اضغط على زر
`إضافة`، بعدها اضغط على زر `Start Tails` للولوج إلى نظام التشغيل تايلز.

<!-- ![لقطة شاشة لنافذة كلمة السرّ الإدارية في شاشة الإقلاع لنظام التشغيل تايلز](لقطة_شاشة_لنافذة_كلمة_السرّ_الإدارية_في_شاشة_الإقلاع_لنظام_التشغيل_تايلز.jpg) -->

### الخطوة 2: اتصل بشبكة Tor

بعد الولوج إلى نظام التشغيل تايلز ستضهر لك نافذة `اتصل Tor`، اضغط على زر
`Connect to Tor Automatically`، ثم اضغط على زر `قم بالاتصال ب Tor`، وأغلق
النافذة.

<!-- ![لقطة شاشة لنافذة اتصال Tor في نظام التشغيل تايلز](لقطة_شاشة_لنافذة_اتصال_Tor_في_نظام_التشغيل_تايلز.jpg) -->

### الخطوة 3: ثبّت برنامج ssss

يسمح لنا برنامج `ssss` بإستخدام خوارزمية شامير لمشاركة الأسرار.

اضغط على زر `الأنشطة` في أعلى اليمين و أكتب في مربع البحث `مدير الحزم التشابكي`
وافتح البرنامج.

سيبدأ التطبيق في تنزيل معلومات الحزم، بعد ذلك اضغط على زر `بحث` في الجزء العلوي الأيسر
واكتب في خانة البحث `ssss`

<!-- ![لقطة شاشة لنافذة البحث في برنامج مدير الحزم التشعبي مكتوب فيها ssss](لقطة_شاشة_لنافذة_البحث_في_برنامج_مدير_الحزم_التشعبي_مكتوب_فيها_ssss.jpg) -->

في نتائج البحث ستجد تطبيق ssss اضغط على اسم التطبيق ومن القائمة التي تظهر اختر
`علم للتثبيت*`، ثم اضغط على زر `تطبيق` في شريط القائمة.

<!-- ![لقطة شاشة لنتائج البحث عن ssss في برنامج مدير الحزم التشعبي](لقطة_شاشة_لنتائج_البحث_عن_ssss_في_برنامج_مدير_الحزم_التشعبي.jpg) -->

في النافذة المنبثقة اضغط على زر `Apply` لبدأ تثبيت البرنامج، وبعد انتهاء التثبيت بنجاح اضغط
على زر `Close` وأغلق مدير الحزم التشعبي.

ملاحظة: يمكنك تعطيل الإنترنت بعد هذه الخطوة.

### الخطوة 4: وُلّد عبارة سرية

**ملاحظة**: هذه الخطوة إختيارية، إذا لديك بالفعل عبارة سرية يمكنك
[تخطي هذه الخطوة](#الخطوة-5-اقسم-السر-إلى-أجزاء-بإستخدام-خاورزمية-شامير-لمشاركة-الأسرار).

إضغط على زر `الأنشطة` في أعلى اليمين و أكتب في مربع البحث `KeePassXC` وافتح البرنامج.

بعدها إذهب إلى شريط القوائم > الأدوات > Password Generator

<!-- ![لقطة شاشة لشري!-- ط قوائم برنامج KeePassXC تشرح كيفية الذهاب إلى نافذة Password Generator](لقطة_شاشة_لشريط_قوائم_برنامج_KeePassXC_تشرح_كيفية_الذهاب_إلى_نافذة_password_generator.jpg) -->

إذهب إلى قسم `عبارة سرية` وحدد عدد الكلمات، ثم سجل العبارة السرية.

[لقطة_شاشة_لشريط_القوائم_لبرنامج_KeePassXC](لقطة_شاشة_لشريط_القوائم_لبرنامج_KeePassXC.png)

### الخطوة 5: اقسم السر إلى أجزاء بإستخدام خاورزمية شامير لمشاركة الأسرار

إضغط على زر `الأنشطة` في أعلى اليمين و أكتب في مربع البحث `الطرفيّة` وافتح البرنامج، وأكتب الأمر التالي:

```text
$ ssss-split -n 3 -t 2 -w "اسم للسر" -s 1024 > "الأجزاء الثلاثة.txt"
```

سيقسم هذا الأمر السر إلى 3 أجزاء وسنحتاج إلى جزئين لإعادة دمج السر
(عدد الأجزاء 3 والعتبة 2).

**شرح خيارات سطر الأوامر**:

- `n-` الأسرار: حدد عدد الأجزاء المولّدة.
- `t-` العتبة: حدد عدد الأجزاء اللازمة لإستعادة السر.
- `w-` علامة: علامة نصية لتسمية السر وتجنب الحيرة في المستقبل، عند اختيارك لعلامة نصية
استخدم كلمة واحدة من ترميز أسكي (ASCII) و لاتستخدم حرف "-" أو "مسافة".
- `s-` المستوى: افرض مستوى شامير للأمان (بصيغة البِت)، هذا الخيار يحدد حد علوي
لطول الجزء الواحد من السر (ستطال الأسرار الصغيرة)، يُسمح فقط بإستخدام أعداد من
مضاعفات العد 8 في المجال من 8 إلى 1024. إذا لم يستعمل هذا الخيار فنسبة الأمان
ستختار تلقائيا إعتمادا على طول السر، يحدد مستوى الأمان طول كل جزء من السر.

انسخ ملف "الأسرار.txt" إلى 3 ملفات كل واحد فيهم يحوي سر واحد فقط.

```text
$ cp "الأجزاء الثلاثة.txt" "الجزء 1.txt"
```

```text
$ cp "الأجزاء الثلاثة.txt" "الجزء 2.txt"
```

```text
$ cp "الأجزاء الثلاثة.txt" "الجزء 3.txt"
```

استخدم محرر نصوص لحذف باقي الأسرار من كل ملف.

يجب أن تحصل على 3 ملفات بهذا الشكل:

**ملاحظة**: العلامة المستخدمة لإنشاء هذه الأسرا كانت "Passphrase".

الجزء 1.txt:

```text
Passphrase-1-23073e92653e2d62df44596a50f27e2ec50ba7cec947c0a6ea496cdd32a0d7cc78230bcaa06a8e07a6cac49e6fe09d0d4ef914a86ed427554d7aed1c201eae0a8c1d818af4eb55d887258538fba54e0cca
```

الجزء 2.txt:

```text
Passphrase-2-08af2da261847822d093a5c6aff3b669ee5d7fb1fb159f9ffb9e41dd2f5f0a8e26ba3bf95613777d1f9f2743c362c23956d4da15a1cbc82a660a1868388c7a33158400439dc955dfcf4de31820289dcbb5
```

الجزء 3.txt:

```text
Passphrase-3-11c8dcb262124b1d2a210e5d050cf1ab0890c864eadbaa88f4d35add240a41b01332d417fbc4205488ac79f758e308d55ecf9f811b3e92ff7f25b4bbcf02362462f37f04bad755dd0895c10796ac2c8962
```

### الخطوة 6: عمِّ الملفات التي تحوي الأجزاء الثلاثة

نعمي الملفات التي تحوي الأجزاء في حالة ما إذا استطاع مهاجم تجميع ما يكفي من الأجزاء لبلوغ
العتبة فلن يستطيع تجميع السر. في [المثال أعلاه](#مثال-لإستخدام-عملي-لطرق-هذا-المقال)
يجب على الورثة حفض كلمة السر المستخدمة لتعمية الأجزاء لكي يستطيعو تجميع السر.

```text
$ openssl aes-256-cbc -a -salt -in "الجزء 1.txt" -out "الجزء 1.enc"*
```

```text
$ openssl aes-256-cbc -a -salt -in "الجزء 2.txt" -out "الجزء 2.enc"*
```

```text
$ openssl aes-256-cbc -a -salt -in "الجزء 3.txt" -out "الجزء 3.enc"*
```

### الخطوة 7: أنشئ ملف تدقيق المجموع للتحقّق من تكامل الأجزاءبدوك فَك تعميتها

يمكننا ملف تدقيق المجموع للتحقّق من امكانية استرجاع السر في وقت لاحق من دون فّك تعميته
والكشف عن السر.

```text
$ sha256sum "الجزء 1.enc" "الجزء 2.enc" "الجزء 3.enc" > "تدقيق المجموع للسر.txt"
```

**ملاحظة**: أنسخ ملف "تدقيق المجموع للسر.txt" إلى جهاز مسرى تسلسلي عميم (USB)
لتتمكن في المستقبل من التحقق من تكامل الأجزاء خاصتك.

### الخطوة 8: أنشئ رموز QR تحوي الأجزاء

```text
$ cat "الجزء 1.enc" | qr --error-correction=H > "الجزء 1.png"
```

```text
$ cat "الجزء 2.enc" | qr --error-correction=H > "الجزء 2.png"
```

```text
$ cat "الجزء 3.enc" | qr --error-correction=H > "الجزء 3.png"
```

### الخطوة 9: احذف الملفات المستعملة في إنشاء رموز QR

سيحذف نظام التشغيل تايلز كل الملفات التي أنشئها المستخدم عند إطفاء الحاسوب أو نزع جهاز
المسرى التسلسلي العميم (USB) المثبت فيه نظام التشغيل تايلز، مع ذلك من الأفضل توخي الحذر
والتأكد بنفسنا من إزالة كل الملفات التي تحوي السر بطريقة حتمية وأمنة.

اضغط على زر الأنشطة في أعلى اليمين و أكتب في مربع البحث `الملفات` وافتح البرنامج. ثم
انتقل إلى المجلد الذي يحوي الملفات التي أنشأت من خلالها رموز QR، وحدد كل الملفات ما عدا
ملفات رموز QR، ثم أنقر على الزر اليمين للفأرة واضعط على زر `Wipe` من قائمة السياق، لمسح
الملف كليا.
<!--
![لقطة شاشة لقائمة السياق لبرنامج الملفات في بيئة سطح المكتب جينوم](لقطة_شاشة_لقائمة_السياق_لبرنامج_الملفات_في_بيئة_سطح_المكتب_جينوم.png)
-->

### الخطوة 10: اطبع رمز QR

افتح صورة رمز QR بإستخدام برنامج `قارء الصور*` ثم اضغط على مفتاح الاختصار
<kbd>Ctrl + p"</kbd>.

أو انسخ صورة رمز QR إلى جهاز مسرى تسلسلي عميم (USB) ، واطبعه بطريقتك المفضّلة.

## استعِد السر من النسخة الاحتياطية

### الخطوة 1: امسح ضوئيًا رموز QR

استخدم برنامج `zbar` لمسح  رموز QR ضوئيًا واحد تلو الأخر، ستحتاج إلى إي جزئين من
الثلاثة.

```text
$ zbarcam --quiet --raw > "الجزء 1.enc"
```

```text
$ zbarcam --quiet --raw > "الجزء 3.enc"
```

### الخطوة 2: فُك تعمية الأجزاء

```text
$ openssl aes-256-cbc -d -a -in "الجزء 1.enc" -out "الجزء 1.txt"*
```

```text
$ openssl aes-256-cbc -d -a -in "الجزء 3.enc" -out "الجزء 3.txt"*
```

### الخطوة 3: اجمع الأجزاء للتحصل على السر الأصلي

```text
$ cat "الجزء 1.txt" "الجزء 3.txt" | ssss-combine -q -t 2
```

 
**ملاحظة**: العدد بعد خيار سطر أوامر `t-` هو عدد الأجزاء اللازمة لتجميع السر الأصلي
(العتبة)، حددنا هذه القيمة مسبقا في
[الخطوة 5: اقسم السر إلى أجزاء بإستخدام خاورزمية شامير لمشاركة الأسرار](#الخطوة-5-اقسم-السر-إلى-أجزاء-بإستخدام-خاورزمية-شامير-لمشاركة-الأسرار)

## تحقق من سلامة النسخ الإحتياطية

يجب التحقق من سلامة النسخ الإحتياطية من حين لأخر. لكي تكون متأكد من إمكانية تجميع السر
من الأجزاء في المستقبل.

### الخطوة 1: امسح ضوئيًا رموز QR

```text
$ zbarcam --quiet --raw > "الجزء 1.enc"
```

```text
$ zbarcam --quiet --raw > "الجزء 2.enc"
```

```text
$ zbarcam --quiet --raw > "الجزء 3enc"
```

### الخطوة 2: التحقق من سلامة النسخ الإحتياطية بإستخدام ملف تدقيق المجموع

```text
$ sha256sum --check  "تدقيق المجموع للسر.txt"
```

يجب أن يكون خرج هذا الأمر كالتالي:

```text
الجزء 1.png: OK
الجزء 2.png: OK
الجزء 3.png: OK
```