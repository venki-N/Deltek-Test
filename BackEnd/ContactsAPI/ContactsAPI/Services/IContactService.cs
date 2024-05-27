using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.Models;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        public Task<Contact> AddContact(Contact contact);
        public Task<bool> UpdateContact(Contact contact);
        public Task<dynamic> GetContactList(int page, int pageSize);
        public Task<Contact> GetContactById(int id);
        public Task<bool> DeleteContactById(int id);
    }
}
