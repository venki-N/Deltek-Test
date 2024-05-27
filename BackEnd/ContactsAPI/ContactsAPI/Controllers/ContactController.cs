using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactsAPI.Controllers
{
    [Route("api/contact")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(Contact[]), 200)]
        public async Task<IActionResult> GetAllContacts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var contacts = await _contactService.GetContactList(page, pageSize);
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Contact), 200)]
        public async Task<IActionResult> GetContactById(int id)
        {
            var contact = await _contactService.GetContactById(id);

            if (contact == null)
            {
                return NotFound(
                    new { message = $"Requested contact id {id} is not found", code = 404 }
                );
            }

            return Ok(contact);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Contact), 200)]
        public async Task<IActionResult> AddContact([FromBody] Contact contact)
        {
            var newContact = await _contactService.AddContact(contact);
            return CreatedAtAction(nameof(GetContactById), new { id = newContact.Id }, newContact);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromBody] Contact contact)
        {
            var result = await _contactService.UpdateContact(contact);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> DeleteContactById(int id)
        {
            var result = await _contactService.DeleteContactById(id);
            if (!result)
            {
                return NotFound(
                    new { message = $"Requested contact id {id} is not found", code = 404 }
                );
            }
            return Ok(result);
        }
    }
}
